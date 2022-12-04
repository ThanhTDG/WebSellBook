const express = require("express");

const {
  ACTION,
  SUBJECT: { ROLE },
} = require("../constants");

const controller = require("../controllers/permission.controller");

const { accessAny } = require("../middlewares/access.middleware");

const router = express.Router();

const canAnyAccess = accessAny(ROLE);

router.get(
  "/",
  canAnyAccess(ACTION.CREATE, ACTION.READ, ACTION.UPDATE, ACTION.DELETE),
  controller.getAll
);

module.exports = router;
