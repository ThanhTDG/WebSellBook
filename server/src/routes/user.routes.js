const express = require("express");

const {
  ACTION,
  SUBJECT: { USER, ADMIN, CUSTOMER },
} = require("../constants");

const controller = require("../controllers/user.controller");

const { access, canAny } = require("../middlewares/access.middleware");
const { accessUser } = require("../middlewares/user.middleware");

const router = express.Router();

const canAccess = access(USER);

router.get("/", canAccess(ACTION.READ), controller.getAll);
router.get(
  "/admin",
  canAny([ACTION.READ, USER], [ACTION.READ, ADMIN]),
  controller.getAdmins
);
router.post(
  "/admin",
  canAny([ACTION.CREATE, USER], [ACTION.CREATE, ADMIN]),
  controller.createAdmin
);
router.get(
  "/customer",
  canAny([ACTION.READ, USER], [ACTION.READ, CUSTOMER]),
  controller.getCustomers
);

router.get("/:id", accessUser(ACTION.READ), controller.get);
router.put("/:id", accessUser(ACTION.UPDATE), controller.update);
router.delete("/:id", accessUser(ACTION.DELETE), controller.remove);

module.exports = router;
