require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 6666;

// Database connection
require("./config/database");

// Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const transactionRoutes = require("./routes/transaction");
const commentRoutes = require("./routes/comment");
const cartRoutes = require("./routes/cart");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/carts", cartRoutes);

// Server running status
app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`);
});
