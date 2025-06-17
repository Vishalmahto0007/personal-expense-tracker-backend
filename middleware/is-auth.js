const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Token invalid." });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed." });
  }
};
