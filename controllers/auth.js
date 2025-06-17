const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErrorMsg = errors.array()[0]?.msg || "Validation failed";
    return res.status(422).json({ message: firstErrorMsg });
  }
  const { email, name, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPw, name });

    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully.", userId: result._id });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this email not found." });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.MY_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      userId: user._id.toString(),
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred during login." });
  }
};
