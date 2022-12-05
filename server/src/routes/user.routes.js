const express = require("express");

const {
  ACTION,
  SUBJECT: { USER, ADMIN, CUSTOMER },
} = require("../constants");

const controller = require("../controllers/user.controller");

const { access } = require("../middlewares/access.middleware");

const router = express.Router();

const canAccess = access(USER);

router.get("/", controller.getAll);
router.get("/admin", controller.getAdmins);
router.post("/admin");
router.get("/customer", controller.getCustomers);

router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
