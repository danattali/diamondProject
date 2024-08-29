const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();

function authentificationToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; // Assuming verified contains user info
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
      rules: { user: { can: ["read"] } },
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByToken = async (req, res) => {
  console.log(req.user);
  console.log("userId");
  const userId = req.user._id; // Assuming req.user._id is the user ID extracted from the token

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
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
      expiresIn: "4h", // Adjust token expiration as necessary
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
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

  // Validate if id is a valid ObjectId
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
    console.error(err);
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
};
