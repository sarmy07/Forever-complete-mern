const Order = require("../model/Order");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, status, totalPrice } = req.body;
    if (!orderItems || orderItems === 0)
      return res.status(400).json("Please provide ordered items");

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      status,
      totalPrice,
    });
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error placing order");
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error fetching orders");
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("user", "username email")
      .populate("orderItems.product", "name price");
    if (!order) return res.status(404).json("order not found");
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error fetching order");
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate(
      "user",
      "email username"
    );
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error fetching order");
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json("order not found");
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error updating order status");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json("order not found");
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error deleting order");
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  getOrderByUser,
  updateOrderStatus,
  deleteOrder,
};
