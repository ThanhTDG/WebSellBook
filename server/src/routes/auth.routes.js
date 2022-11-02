const express = require("express");

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.post("/signout", controller.signOut);

router.get("/profile", auth, controller.getProfile);
// router.put("/profile");

// router.put("/uploadavatar", auth);
router.put("/changepassword", auth, controller.changePassword);

module.exports = router;
