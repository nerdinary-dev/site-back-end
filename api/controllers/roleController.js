const Role = require("../models/roleModel.js");

const getRoles = (req, res) => {
  Role.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getRole = (req, res) => {
  Role.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "Role not found" }));
};

const createRole = (req, res) => {
  console.log(req.body);
  Role.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateRole = (req, res) => {
  Role.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "Role not found" }));
};

const deleteRole = (req, res) => {
  Role.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ msg: "Role deleted", result }))
    .catch((error) => res.status(404).json({ msg: "Role not found" }));
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
