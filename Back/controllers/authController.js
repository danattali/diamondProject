const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();
function authentificationToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}
const rules = {
  user: {
    can: ["read"],
  },
  admin: {
    can: ["read", "write"],
  },
};
const register = async (req, res) => {
  try {
    const { fullName, userEmail, password, telephone, address } = req.body;
    console.log(req.body);
    const user = await User.findOne({ userEmail });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const newUser = new User({
      fullName,
      userEmail,
      password: hashedPassword,
      telephone,
      address,
      rules,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { register, login, authentificationToken, allUsers };
