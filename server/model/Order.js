const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [{}],
    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      Country: String,
      phone: Number,
    },
    status: {
      type: String,
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
