const express = require("express");
const passport = require("passport");

const {
  authenticate,
  requiredLogin,
} = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");
const { upload } = require("../services/upload.service");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", requiredLogin, controller.signIn);
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  controller.signOut
);

router.get("/profile", authenticate, controller.getProfile);
router.put("/profile", authenticate, controller.setProfile);
router.put(
  "/uploadavatar",
  authenticate,
  upload("avatars").single("avatar"),
  controller.uploadAvatar
);
router.put("/changepassword", authenticate, controller.changePassword);

module.exports = router;
