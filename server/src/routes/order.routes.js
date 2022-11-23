const express = require("express");

const controller = require("../controllers/order.controller");

const router = express.Router();

router.get("/", controller.getAll);
// router.post("/", controller.create);

router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
