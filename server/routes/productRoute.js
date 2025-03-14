const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/productController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create", verifyToken, verifyAdmin, createProduct);
router.get("/products", getProducts);
router.get("/:id", getProduct);

module.exports = router;
