const express = require("express");

const controller = require("../controllers/favorite.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, controller.getFavorites);

router.post("/:book", authenticate, controller.addFavorite);
router.delete("/:book", authenticate, controller.removeFavorite);

module.exports = router;
