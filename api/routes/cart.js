const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Cart routes
router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
router.get("/:id", cartController.getCartById);
router.put("/rts/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
