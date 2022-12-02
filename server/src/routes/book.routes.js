const express = require("express");

const {
  ACTION,
  SUBJECT: { BOOK },
} = require("../constants");

const controller = require("../controllers/book.controller");

const { access } = require("../middlewares/access.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const { uploadBookImgs } = require("../middlewares/cloudinary.middleware");

const router = express.Router();

const canAccess = access(BOOK);

router.get("/", authenticate, canAccess(ACTION.READ), controller.getAll);
router.post("/", authenticate, canAccess(ACTION.READ), controller.create);

router.get("/:id", authenticate, canAccess(ACTION.READ), controller.get);
router.put("/:id", authenticate, canAccess(ACTION.READ), controller.update);
router.delete("/:id", authenticate, canAccess(ACTION.READ), controller.remove);

router.post(
  "/:id/upload",
  authenticate,
  canAccess(ACTION.READ),
  uploadBookImgs,
  controller.uploadImgs
);
router.post(
  "/:id/destroy",
  authenticate,
  canAccess(ACTION.READ),
  controller.destroyImgs
);

module.exports = router;
