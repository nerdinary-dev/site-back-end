const Product = require("../models/productModel");
const Role = require("../models/roleModel");

async function isSeller(req, res, next) {
  const userId = req.user.id;
  const productId = req.params.id;
  try {
    const role = await Role.findById(req.user.role);
    if (role.name === "admin") {
      return next();
    } else if (role.name === "seller") {
      Product.findOne({ _id: productId, seller: userId })
        .then((product) => {
          if (!product) {
            return res.status(403).json({
              msg: "You do not have permission to perform this action",
            });
          }
          next();
        })
        .catch((err) => {
          return res.status(500).json({ msg: "Internal server error" });
        });
    } else {
      return res
        .status(403)
        .json({ msg: "You do not have permission to perform this action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = isSeller;
