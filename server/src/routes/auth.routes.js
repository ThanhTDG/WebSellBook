const express = require("express");

const controller = require("../controllers/auth.controller");

const {
  authenticate,
  requiredLogin,
} = require("../middlewares/auth.middleware");
const { uploadAvatar } = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", requiredLogin, controller.signIn);
router.post("/signout", authenticate, controller.signOut);

router.get("/profile", authenticate, controller.getProfile);
router.put("/profile", authenticate, controller.setProfile);

router.put(
  "/uploadavatar",
  authenticate,
  uploadAvatar,
  controller.uploadAvatar
);
router.put("/changepassword", authenticate, controller.changePassword);

router.post("/verifyaccount", authenticate, controller.verifyAccount);

module.exports = router;
