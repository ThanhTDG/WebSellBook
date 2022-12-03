const express = require("express");

const {
  ACTION,
  SUBJECT: { BOOK },
} = require("../constants");

const controller = require("../controllers/book.controller");

const { access } = require("../middlewares/access.middleware");
const {
  uploadImgs,
  destroyImg,
} = require("../middlewares/cloudinary.middleware");

const router = express.Router();

const canAccess = access(BOOK);

router.get("/", canAccess(ACTION.READ), controller.getAll);
router.post("/", canAccess(ACTION.CREATE), controller.create);

router.post(
  "/upload",
  canAccess(ACTION.UPDATE),
  uploadImgs("books"),
  controller.uploadImgs
);
router.post(
  "/destroy",
  canAccess(ACTION.UPDATE),
  destroyImg("books"),
  controller.destroyImg
);

router.get("/:id", canAccess(ACTION.READ), controller.get);
router.put("/:id", canAccess(ACTION.UPDATE), controller.update);
router.delete("/:id", canAccess(ACTION.DELETE), controller.remove);

module.exports = router;
