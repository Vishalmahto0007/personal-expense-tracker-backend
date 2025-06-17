const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("E-Mail address already exists!");
        }
        return true;
      })
      .normalizeEmail(),
    body("password").isLength({ min: 6 }).trim(),
    body("name").not().isEmpty().trim(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
