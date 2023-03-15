const Transaction = require("../models/transactionModel");

// Créer une nouvelle transaction
exports.createTransaction = (req, res) => {
  const { order, amount, currency } = req.body;

  const newTransaction = new Transaction({ order, amount, currency });

  newTransaction.save((err, transaction) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating transaction");
    }
    res.status(201).json({ message: "Transaction created", transaction });
  });
};

// Obtenir toutes les transactions
exports.getAllTransactions = (req, res) => {
  Transaction.find({}, (err, transactions) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting transactions");
    }
    res.json(transactions);
  });
};

// Obtenir une transaction par son ID
exports.getTransactionById = (req, res) => {
  const { id } = req.params;
  Transaction.findById(id, (err, transaction) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error getting transaction by id");
    }
    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }
    res.json(transaction);
  });
};

// Mettre à jour une transaction
exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Transaction.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true },
    (err, transaction) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating transaction");
      }
      if (!transaction) {
        return res.status(404).send("Transaction not found");
      }
      res.json({ message: "Transaction updated", transaction });
    }
  );
};

// Supprimer une transaction
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.findByIdAndDelete(id, (err, transaction) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting transaction");
    }
    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }
    res.json({ message: "Transaction deleted", transaction });
  });
};
