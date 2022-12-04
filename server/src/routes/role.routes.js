const express = require("express");

const {
  ACTION,
  SUBJECT: { ROLE },
} = require("../constants");

const controller = require("../controllers/role.controller");

const { access } = require("../middlewares/access.middleware");

const router = express.Router();

const canAccess = access(ROLE);

router.get("/", canAccess(ACTION.READ), controller.getAll);
router.post("/", canAccess(ACTION.CREATE), controller.create);

router.get("/:id", canAccess(ACTION.READ), controller.get);
router.put("/:id", canAccess(ACTION.UPDATE), controller.update);
router.delete("/:id", canAccess(ACTION.DELETE), controller.remove);

module.exports = router;
