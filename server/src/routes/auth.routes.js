const express = require("express");

const controller = require("../controllers/auth.controller");

const {
  authenticate,
  requiredLogin,
} = require("../middlewares/auth.middleware");
const {
  uploadAvatar,
  destroyAvatar,
} = require("../middlewares/cloudinary.middleware");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", requiredLogin, controller.signIn);
router.post("/signout", authenticate, controller.signOut);

router.post("/verifyaccount", authenticate, controller.verifyAccount);

router.get("/profile", authenticate, controller.getProfile);
router.put("/profile", authenticate, controller.setProfile);

router.put(
  "/uploadavatar",
  authenticate,
  uploadAvatar,
  destroyAvatar,
  controller.uploadAvatar
);
router.put("/changepassword", authenticate, controller.changePassword);

module.exports = router;
