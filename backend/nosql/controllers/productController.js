const { PRODUCTS, CART } = require("../models/productSchema");
const client = require("../libs/redis");

// Products functions
const getAllProducts = async (req, res) => {
  try {
    const cacheValue = await client.get("all-products");
    if (cacheValue) {
      res.status(200).json(JSON.parse(cacheValue));
      return;
    }
    const data = await PRODUCTS.find();
    await client.set("all-products", JSON.stringify(data));
    await client.expire("all-products", 300);
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
    res.status(400).json({ message: error.message });
  }
};

const searchProducts = async (req, res) => {
  const keyword = req.query.keyword; // user searched keywords
  try {
    // Split the keyword into an array of words
    const keywordsArray = keyword.split(/\s+/).filter(Boolean);
    // Create an array of regular expressions for each keyword
    const regexArray = keywordsArray.map((keyword) => new RegExp(keyword, "i"));
    // Use $or to match any of the regular expressions
    const products = await PRODUCTS.find({
      $or: keywordsArray.map((keyword) => ({
        name: { $regex: new RegExp(keyword, "i") },
      })),
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Carts functions
const getCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await CART.findOne({ user: userId }).populate(
      "products.product"
    );
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

module.exports = {
  getAllProducts,
  getCartProducts,
  searchProducts,
  addNewProductToCart,
  deleteCartProduct,
  addNewProducts,
};
