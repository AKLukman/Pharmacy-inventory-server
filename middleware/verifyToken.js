const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorised user");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACESS_TOKEN, function (err, decoded) {
    if (err) {
      res.status(403).send({ message: "Forbidden" });
    }
    req.decoded = decoded;
    next();
  });
};
