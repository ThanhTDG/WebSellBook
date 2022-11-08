const express = require("express");

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");
const { upload } = require("../services/upload.service");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.post("/signout", auth, controller.signOut);

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
