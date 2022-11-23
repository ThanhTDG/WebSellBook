const express = require("express");

const controller = require("../controllers/book.controller");

const { uploadBookImgs } = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.create);

router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

router.post("/:id/upload", uploadBookImgs, controller.uploadImgs);

module.exports = router;
