const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const USERS = [
  { id: 1, login: "boris", password: bcrypt.hashSync("boris", 8) },
];

function login(req, res) {
  // Search for user in list
  const foundUser = USERS.find((user) => user.login === req.body.login);

  if (!foundUser) {
    return res.status(404).send({ message: "User Not found." });
  }

  // Comparing passwords
  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    foundUser.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  // Generating new token by secret word sync
  const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Send user
  res.status(200).send({
    id: foundUser.id,
    login: foundUser.login,
    accessToken: token,
  });
}

router.post("/login", login);

module.exports = router;
