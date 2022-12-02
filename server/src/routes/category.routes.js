const express = require("express");

const {
  ACTION,
  SUBJECT: { CATEGORY },
} = require("../constants");

const controller = require("../controllers/category.controller");

const { access } = require("../middlewares/access.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

const canAccess = access(CATEGORY);

router.get("/", authenticate, canAccess(ACTION.READ), controller.getAll);
router.post("/", authenticate, canAccess(ACTION.CREATE), controller.create);

router.get("/:id", authenticate, canAccess(ACTION.READ), controller.get);
router.put("/:id", authenticate, canAccess(ACTION.UPDATE), controller.update);
router.delete(
  "/:id",
  authenticate,
  canAccess(ACTION.DELETE),
  controller.remove
);

module.exports = router;
