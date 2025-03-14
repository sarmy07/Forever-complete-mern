const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrder,
  getOrderByUser,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/orderController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/all-orders", getAllOrders);
router.get("/user/:userId", verifyToken, getOrderByUser);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus);
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

module.exports = router;
