const { CART, ORDER } = require("../models/productSchema");
const totalPrice = require("../utils/functions/totalPrice");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");

// Orders functions
const paymentIntent = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await CART.findOne({ user: userId }).populate(
      "products.product"
    );

    const paymentIntents = await stripe.paymentIntents.create({
      amount: totalPrice(cart) * 100,
      currency: "usd",
      description: "One-time purchase",
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: "ashraf@gmail.com",
    });

    res.status(200).json({ clientSecret: paymentIntents.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const orderProducts = async (req, res) => {
  const details = req.body;
  const userId = req.user._id;

  try {
    const cart = await CART.findOne({ user: userId }).populate(
      "products.product"
    );
    const order = await ORDER.create({
      user: userId,
      products: cart.products,
      total: totalPrice(cart),
      address: details.address,
      phone: details.phone,
      orderDate: new Date().getDate(),
    });

    cart.products = [];
    await cart.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  orderProducts,
  orderHistory,
  paymentIntent,
};
