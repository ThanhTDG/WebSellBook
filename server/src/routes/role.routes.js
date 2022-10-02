const express = require("express");

const controller = require("../controllers/role.controller");

const router = express.Router();

router.get("/roles", controller.getAll);
router.post("/roles", controller.create);

router.get("/roles/:id", controller.get);
router.patch("/roles/:id", controller.update);
router.delete("/roles/:id", controller.remove);

module.exports = router;
