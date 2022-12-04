const express = require("express");

const {
  ACTION,
  SUBJECT: { ROLE },
  SUBJECT,
} = require("../constants");

const controller = require("../controllers/role.controller");

const { access, canAny } = require("../middlewares/access.middleware");

const router = express.Router();

const canAccess = access(ROLE);

router.get(
  "/",
  canAny(
    [ACTION.READ, SUBJECT.ROLE],
    [ACTION.CREATE, SUBJECT.USER],
    [ACTION.READ, SUBJECT.USER],
    [ACTION.UPDATE, SUBJECT.USER],
    [ACTION.CREATE, SUBJECT.ADMIN],
    [ACTION.READ, SUBJECT.ADMIN],
    [ACTION.UPDATE, SUBJECT.ADMIN]
  ),
  controller.getAll
);
router.post("/", canAccess(ACTION.CREATE), controller.create);

router.get("/:id", canAccess(ACTION.READ), controller.get);
router.put("/:id", canAccess(ACTION.UPDATE), controller.update);
router.delete("/:id", canAccess(ACTION.DELETE), controller.remove);

module.exports = router;
