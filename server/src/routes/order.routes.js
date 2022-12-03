const express = require("express");

const {
  ACTION,
  SUBJECT: { ORDER },
} = require("../constants");

const controller = require("../controllers/order.controller");

const { access } = require("../middlewares/access.middleware");

const router = express.Router();

const canAccess = access(ORDER);

router.get("/", canAccess(ACTION.READ), controller.getAll);

router.get("/:id", canAccess(ACTION.READ), controller.get);
router.put("/:id", canAccess(ACTION.UPDATE), controller.update);
router.delete("/:id", canAccess(ACTION.DELETE), controller.remove);

module.exports = router;
