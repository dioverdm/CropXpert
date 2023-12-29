const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  // taking data from frontend
  // need to check whether our password is safe or not

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  // findOne query to check whether the user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // creating new user in the db using create query
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (newUser) {
    // this is how we send back data
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body); it was written to debugg the issue

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // comparing the password is same as the one saved using matchPasswrod
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;

  const query = keyword
    ? {
        // mongoDB queries
        // $or is logical or operator
        // $option "i" means it has to be case-insensitive
        // $regex literally means regular expression capabilites for patter matching strings in queries
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}; // or do nothing

  const users = await User.find(query)
    .select("-password")
    .find({ _id: { $ne: req.user._id } });
  res.send(users);
});

// editPic 
const editPic = asyncHandler(async (req, res) => {
  const { pic } = req.body;
  // debug
  // console.log(req.body);
  // console.log(req.user._id);

  if (!pic) {
    res.status(400);
    throw new Error("Please provide a valid profile picture URL");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { pic: pic } },
      { new: true } // returns the modified document
    );
    // debug
    // console.log(updatedUser);
    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }


    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating profile picture",
      error: error.message,
    });
  }
});



module.exports = { registerUser, authUser, allUsers, editPic };
// we have to export it like this becuase we are exporting muliple logics and
// function we developed
