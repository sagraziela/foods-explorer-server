const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");
const FoodsPictureController = require("../controllers/FoodsPictureController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const foodsRoutes = Router();
const foodsController = new FoodsController();
const foodsPictureController = new FoodsPictureController();
const upload = multer(uploadConfig.MULTER);

foodsRoutes.use(ensureAuthentication);

foodsRoutes.post("/", foodsController.create);
foodsRoutes.patch("/picture/:id", upload.single("picture"), foodsPictureController.update);
foodsRoutes.put("/:id", foodsController.update);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.delete("/:id", foodsController.delete);

module.exports = foodsRoutes;