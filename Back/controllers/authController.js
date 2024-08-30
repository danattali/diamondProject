const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again tomorrow",
});

require("dotenv").config();

const authentificationToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Token verified successfully:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const getUserByToken = async (req, res) => {
  console.log("Request user:", req.user);

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user._id;
  console.log("Extracted user ID:", userId);

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid user ID format:", userId);
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUserByToken:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { fullName, userEmail, password, telephone, address, rules } =
      req.body;

    const user = await User.findOne({ userEmail });
    console.log("Existing user:", user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({
      fullName,
      userEmail,
      password: hashedPassword,
      telephone,
      address,
      rules: {
        name: rules.name || "user",
        can: rules.can || ["read"],
      }, // Simplified rules assignment
    });

    await newUser.save();
    console.log("New user saved:", newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "4h", // Token expires in 4 hours
    });
    console.log("Token:", token);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.userEmail,
        rules: user.rules,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userById = async (req, res) => {
  const { id } = req.params;
  console.log("User ID:", req.params);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const changeRules = async (req, res) => {
  const { id } = req.params;
  const { rules } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming `rules` is an object, you might need to validate its structure
    if (typeof rules !== "object" || !rules.name || !Array.isArray(rules.can)) {
      return res.status(400).json({ message: "Invalid rules format" });
    }

    user.rules = rules; // Update the rules field
    await user.save();

    res.status(200).json({ message: "User rules updated successfully" });
  } catch (err) {
    console.error("Error updating user rules:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  register,
  login,
  authentificationToken,
  allUsers,
  userById,
  getUserByToken,
  changeRules,
};
