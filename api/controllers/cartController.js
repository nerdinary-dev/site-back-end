const Cart = require("../models/cartModel.js");

const getCarts = (req, res) => {
  Cart.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getCart = (req, res) => {
  Cart.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Cart not found" }));
};

const createCart = (req, res) => {
  console.log(req.body);
  Cart.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateCart = (req, res) => {
  Cart.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "Cart not found" }));
};

const deleteCart = (req, res) => {
  Cart.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ msg: "Cart deleted", result }))
    .catch((error) => res.status(404).json({ msg: "Cart not found" }));
};

module.exports = {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
};
