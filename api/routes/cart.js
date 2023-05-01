const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Cart routes
router.get("/", cartController.getCarts);
router.post("/", cartController.createCart);
router.get("/:id", cartController.getCart);
router.put("/rts/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
