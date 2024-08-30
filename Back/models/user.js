const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  userEmail: String,
  password: String,
  telephone: String,
  address: String,
  rules: {
    name: { type: String, enum: ["admin", "user"], default: "user" },
    can: { type: [String], default: ["read"] },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
