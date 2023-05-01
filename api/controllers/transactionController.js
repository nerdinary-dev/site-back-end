const Transaction = require("../models/transactionModel.js");

const getTransactions = (req, res) => {
  Transaction.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getTransaction = (req, res) => {
  Transaction.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Transaction not found" }));
};

const createTransaction = (req, res) => {
  console.log(req.body);
  Transaction.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateTransaction = (req, res) => {
  Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "Transaction not found" }));
};

const deleteTransaction = (req, res) => {
  Transaction.findOneAndDelete({ _id: req.params.id })
    .then((result) =>
      res.status(200).json({ msg: "Transaction deleted", result })
    )
    .catch((error) => res.status(404).json({ msg: "Transaction not found" }));
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
