const { PRODUCTS, CART } = require("../schemas/product.schema");
const client = require("../libs/redis");

// Products functions
const getAllProducts = async (req, res) => {
  try {
    const cacheValue = await client.call("JSON.GET", "all-products");
    if (JSON.parse(cacheValue).length > 0) {
      res.status(200).json(JSON.parse(cacheValue));
      return;
    }
    const data = await PRODUCTS.find();
    await client.call("JSON.SET", "all-products", "$", JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addNewProducts = async (req, res) => {
  try {
    const product = req.body;
    const data = await PRODUCTS.create({ ...product });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).end({ message: "Failed to add new product" });
  }
};

// Carts functions
const getCartProducts = async (req, res) => {
  const userId = req.user._id;
  try {
    const cacheValue = await client.call("JSON.GET", `currentUser:cart`);
    if (cacheValue) {
      res.status(200).json(JSON.parse(cacheValue));
      return;
    }
    const cart = await CART.findOne({ user: userId }).populate(
      "products.product"
    );
    await client
      .multi()
      .call("JSON.SET", `currentUser:cart`, "$", JSON.stringify(cart))
      .call("expire", `currentUser:cart`, "900")
      .exec();
    res.status(200).json(!cart ? [] : cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addNewProductToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  try {
    const cart = await CART.findOne({ user: userId });

    // Create frash new cart
    if (!cart) {
      const createNewCart = await CART.create({
        user: userId,
        products: [{ product: productId, quantity }],
      });
      const newCart = await CART.findById(createNewCart._id).populate(
        "products.product"
      );
      return res.status(201).json(newCart);
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find((item) =>
      item.product.equals(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; // increase the product quantity
    } else {
      cart.products.push({ product: productId, quantity }); // Add product to existing bucket
    }

    await cart.save();
    await cart.populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCartProduct = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id;
  try {
    const updatedCart = await CART.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate("products.product");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// recommendations
const searchProducts = async (req, res) => {
  const { search } = req.body;
  try {
    if (!search) {
      throw new Error("Name not found for recomendation");
    }

    const searchedProducts = await PRODUCTS.find({
      $text: { $search: search }, // using mongoDB indexing to find the seached product quickly
    });

    res.status(200).json(searchedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const productRecomendation = async (req, res) => {
  const { name: productName } = req.body;

  try {
    if (!productName) {
      throw new Error("Name not found for recomendation");
    }

    const recomendation = await PRODUCTS.find({
      $and: [
        { $text: { $search: productName } }, // mongoDB text search indexing
        { name: { $ne: productName } }, // ($ne: not equal) avoid the current product
      ],
    }).limit(4);

    // if any recomended product not found then pick three random products
    if (recomendation.length === 0) {
      const pickRandomProducts = await PRODUCTS.aggregate([
        { $match: { name: { $ne: productName } } }, // ($ne: not equal) match the current product and avoid it
        { $sample: { size: 4 } }, // give three random products
      ]);
      res.status(200).json(pickRandomProducts);
      return;
    }

    res.status(200).json(recomendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getCartProducts,
  searchProducts,
  addNewProductToCart,
  deleteCartProduct,
  addNewProducts,
  productRecomendation,
};
