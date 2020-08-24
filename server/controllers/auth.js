const express = require("express");
const User = require("../models/User");

const router = express.Router();

const login = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(403).send({ message: "Please provide cridentials" });
  }

  // Finding user
  const user = await User.findOne({ login }).select("+password");

  if (!user) {
    return res.status(401).send({ message: "Wrong login" });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).send({ message: "Wrong password" });
  }

  // Create token
  const token = user.getSignedJwtToken();

  // Send token
  res.status(200).send({
    accessToken: token,
  });
};

router.post("/login", login);

module.exports = router;
