const Product = require("../models/productModel");

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, "gi");
    const results = await Product.find({
      $or: [{ title: regex }, { description: regex }],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
