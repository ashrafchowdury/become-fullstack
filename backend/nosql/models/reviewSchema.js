const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  rate: { type: Number, required: true },
  review: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  productId: { type: mongoose.Types.ObjectId, required: true },
});

const REVIEW = mongoose.model("Reviews", reviewSchema);

module.exports = REVIEW;
