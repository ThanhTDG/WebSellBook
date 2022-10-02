const express = require("express");

const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", controller.getAll);
router.post("/users", controller.create);

router.get("/users/:id", controller.get);
router.patch("/users/:id", controller.update);
router.delete("/users/:id", controller.remove);

module.exports = router;
