const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// User routes
router.get("/", auth, isAdmin, userController.getUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
