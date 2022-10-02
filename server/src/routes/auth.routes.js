const express = require("express");

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth/signup", controller.signUp);
router.post("/auth/signin", controller.signIn);
router.post("/auth/signout", auth, controller.signOut);

module.exports = router;
