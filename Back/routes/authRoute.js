const express = require("express");
const router = express.Router();
const {
  register,
  login,
  allUsers,
  userById,
} = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/", allUsers);
router.get("/:id", userById);
module.exports = router;
