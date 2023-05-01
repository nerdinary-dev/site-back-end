const Product = require("../models/productModel");

exports.search = (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, "gi");
  Product.find({
    $or: [{ title: regex }, { description: regex }],
  })
    .then(res.json(results))
    .catch((error) => res.status(500).json({ message: error }));
};
