const Product = require("../models/productModel");

// CREATE
exports.createProduct = (req, res) => {
  const { title, description, price, image } = req.body;

  const newProduct = new Product({
    title,
    description,
    price,
    image,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// GET BY ID
exports.getProductById = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// GET ALL
exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// UPDATE
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { title, description, price, image } = req.body;

  Product.findByIdAndUpdate(
    id,
    { title, description, price, image },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// DELETE
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
