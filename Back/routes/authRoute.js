const express = require("express");
const router = express.Router();
const {
  register,
  login,
  allUsers,
  userById,
  getUserByToken,
  authentificationToken,
  changeRules,
} = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/", allUsers);
router.get("/:id", userById);
router.get("/user", authentificationToken, getUserByToken);
router.put("/:id/rules", authentificationToken, changeRules);

module.exports = router;
