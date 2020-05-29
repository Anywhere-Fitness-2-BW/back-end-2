const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET || 'This is my precious!', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Token invalid" });
      } else {
        console.log(decodedToken)
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
};