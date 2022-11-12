const express = require("express");
const passport = require("passport");

const { auth, requiredLogin } = require("../middlewares/auth.middleware");
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

router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.setProfile);
router.put(
  "/uploadavatar",
  auth,
  upload("avatars").single("avatar"),
  controller.uploadAvatar
);
router.put("/changepassword", auth, controller.changePassword);

module.exports = router;
