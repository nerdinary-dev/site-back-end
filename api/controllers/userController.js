const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      role,
      phoneNumber,
      profilePicture,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      location,
      role,
      phoneNumber,
      profilePicture,
    });
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.header("auth-token", token).status(201).json(payload);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      id: existingUser.id,
      role: existingUser.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.header("auth-token", token).json({
      token,
      payload,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ msg: "User deleted", result }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

module.exports = {
  createUser,
  signup,
  signin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
