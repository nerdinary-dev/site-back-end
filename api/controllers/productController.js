const Product = require("../models/productModel.js");

const getProducts = (req, res) => {
  Product.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Product not found" }));
};

const createProduct = (req, res) => {
  console.log(req.body);
  Product.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateProduct = (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "Product not found" }));
};

const deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ msg: "Product deleted", result }))
    .catch((error) => res.status(404).json({ msg: "Product not found" }));
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
