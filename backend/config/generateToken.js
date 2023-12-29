const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    // expires in 30days
  });
  // we need to provide id and a secret
};

module.exports = generateToken;
