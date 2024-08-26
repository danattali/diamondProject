const express = require("express");
const router = express.Router();
const {
  register,
  login,
  allUsers,
  userById,
  getUserByToken,
} = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/", allUsers);
router.get("/:id", userById);
router.get("/user", getUserByToken);
module.exports = router;
