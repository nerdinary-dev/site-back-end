const Order = require("../models/orderModel.js");

const getOrders = (req, res) => {
  Order.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getOrder = (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Order not found" }));
};

const createOrder = (req, res) => {
  console.log(req.body);
  Order.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateOrder = (req, res) => {
  Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "Order not found" }));
};

const deleteOrder = (req, res) => {
  Order.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ msg: "Order deleted", result }))
    .catch((error) => res.status(404).json({ msg: "Order not found" }));
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
