const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// this is somthing more advance but if you explore more about jwt
// you will understand a lot about jwt and how to use jwt
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      // after we sent decoded id to the DB we will return the data without password

      next();
    } catch (error) {
      res.status(401);

      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    console.log("authMiddleware issue token not available");
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
