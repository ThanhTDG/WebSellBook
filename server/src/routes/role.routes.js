const express = require("express");

const {
  ACTION,
  SUBJECT: { ROLE, USER, ADMIN },
} = require("../constants");

const controller = require("../controllers/role.controller");

const { access, canAny } = require("../middlewares/access.middleware");

const router = express.Router();

const canAccess = access(ROLE);

router.get(
  "/",
  canAny(
    [ACTION.READ, ROLE],
    [ACTION.CREATE, USER],
    [ACTION.READ, USER],
    [ACTION.UPDATE, USER],
    [ACTION.CREATE, ADMIN],
    [ACTION.READ, ADMIN],
    [ACTION.UPDATE, ADMIN]
  ),
  controller.getAll
);
router.post("/", canAccess(ACTION.CREATE), controller.create);

router.get("/:id", canAccess(ACTION.READ), controller.get);
router.put("/:id", canAccess(ACTION.UPDATE), controller.update);
router.delete("/:id", canAccess(ACTION.DELETE), controller.remove);

module.exports = router;
