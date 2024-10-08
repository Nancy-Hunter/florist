const { Double, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type:  mongoose.Types.Decimal128,
    require: true,
  },
  category: {
    type: String,
  },
  bloom: {
    type: Array,
  },
  available: {
    type: Boolean,
    default: true,
  },
  onSale: {
    type: Boolean,
    default: false,
    required: true,
  },
  discount: {
    type:  mongoose.Types.Decimal128,
    default:  mongoose.Types.Decimal128('0.00'),
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
