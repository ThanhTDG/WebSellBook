const express = require("express");

const controller = require("../controllers/category.controller");

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", controller.getAll);
router.post("/", controller.create);

router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
