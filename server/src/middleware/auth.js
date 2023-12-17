const jwt = require("jsonwebtoken");
const secretKey = "token_access";
function authenticateJWT(req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  token = token.split(" ")[1];
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(token);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
