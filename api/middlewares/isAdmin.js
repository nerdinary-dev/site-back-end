const Role = require("../models/roleModel");

async function isAdmin(req, res, next) {
  try {
    const role = await Role.findById(req.user.role);
    if (!role) {
      return res.status(403).json({ msg: "Admin access required" });
    }
    if (role.name !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = isAdmin;
