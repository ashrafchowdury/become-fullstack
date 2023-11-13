const { PRODUCTS, CART, ORDER } = require("../models/grocerySchema");

const getAllProducts = async (req, res) => {
  try {
    const data = await PRODUCTS.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const data = await CART.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

const addNewProductToCart = async (req, res) => {
  const product = req.body;
  try {
    const data = await CART.insertMany({ ...product });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    await CART.findByIdAndDelete({
      _id: req.body.id,
    });
    const data = await CART.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

const orderProducts = async (req, res) => {
  const order = req.body;
  try {
    const data = await ORDER.insertMany({ ...order });
    order.items.map(
      async (item) => await CART.findByIdAndDelete({ _id: item?._id })
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

module.exports = {
  getAllProducts,
  getCartProducts,
  addNewProductToCart,
  deleteCartProduct,
  orderProducts,
};
