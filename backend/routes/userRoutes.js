const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  editPic,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
// what we can do is in router.route we can add all over related routes
router.route("/profile").post(protect,editPic);
module.exports = router;
