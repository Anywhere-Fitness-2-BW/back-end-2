module.exports = function(req, res, next) {
    if (req.decodedJwt.instructor) {
      next();
    } else {
      res.status(403).json({ message: "Alert! Instructor only area!" });
    }
  };