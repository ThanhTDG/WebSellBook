const express = require("express");

const {
  ACTION,
  SUBJECT: { USER, ADMIN, CUSTOMER },
} = require("../constants");

const controller = require("../controllers/user.controller");

const { access } = require("../middlewares/access.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

const canAccess = access(USER);

router.get("/", authenticate, controller.getAll);
router.post("/", authenticate, controller.create);

router.get("/:id", authenticate, controller.get);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.remove);

module.exports = router;
