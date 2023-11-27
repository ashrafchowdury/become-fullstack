const { PRODUCTS, CART, ORDER } = require("../models/productSchema");

// Products functions
const getAllProducts = async (req, res) => {
  try {
    const data = await PRODUCTS.find();
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

// Orders functions
const orderProducts = async (req, res) => {
  const { details, payment } = req.body;
  const userId = req.user._id;
  try {
    const cart = await CART.findOne({ user: userId }).populate(
      "products.product"
    );

    // Calculate total price
    const tax = 5;
    const totalPrice = cart.products.reduce(
      (total, item) =>
        total +
        Number(item?.product?.price?.substring(1)) * item?.quantity +
        tax,
      0
    );

    const newOrder = await ORDER.create({
      user: userId,
      products: cart.products,
      total: totalPrice,
      address: details.address,
      phone: details.phone,
      orderDate: new Date().getDate(),
    });

    // Clear the user's cart after placing the order
    cart.products = [];
    await cart.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const history = await ORDER.find({ user: userId }).populate(
      "products.product"
    );
    res.status(200).json(history);
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
  orderProducts,
  addNewProducts,
  orderHistory,
};
