const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");
const isSeller = require("../middlewares/isSeller");

// Product routes
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", auth, isSeller, productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
