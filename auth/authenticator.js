const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || "This is my precious!";

    jwt.verify(authorization, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Token is Invalid" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "You do not have permission to enter!" });
  }
};
