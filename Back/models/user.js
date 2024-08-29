const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  userEmail: String,
  password: String,
  telephone: String,
  address: String,
  rules: {
    type: Object,
    default: { can: ["read"] },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
