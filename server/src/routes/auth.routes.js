const express = require("express");

const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/auth/signup", controller.signUp);
router.post("/auth/signin", controller.signIn);

module.exports = router;
