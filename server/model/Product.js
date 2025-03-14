const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {},
    images: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
