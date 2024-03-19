const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
  userLogout,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", userProfile);
router.post("/logout", userLogout);

module.exports = router;
