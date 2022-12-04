const express = require("express");

const controller = require("../controllers/favorite.controller");

const router = express.Router();

router.get("/", controller.getFavorites);

router.post("/:book", controller.addFavorite);
router.delete("/:book", controller.removeFavorite);

module.exports = router;
