const REVIEW = require("../models/reviewSchema");

const getProductReview = async (req, res) => {
  const productId = req.params.productId;
  try {
    const reviews = await REVIEW.find({
      productId: productId,
    }).populate("user");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).end({ error: error.message });
  }
};

const addProductReview = async (req, res) => {
  const { rate, review, productId, date } = req.body;
  const user = req.user._id;
  try {
    const reviewProduct = await REVIEW.create({
      rate,
      review,
      productId,
      date,
      user,
    });
    return res.status(201).json(reviewProduct);
  } catch (error) {
    console.log(error);
    res.status(400).end({ error: error.message });
  }
};

module.exports = { addProductReview, getProductReview };
