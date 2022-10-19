const express = require("express");

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.get("/signout", auth, controller.signOut);

module.exports = router;
