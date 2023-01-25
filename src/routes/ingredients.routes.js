const { Router } = require("express");
const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();
const upload = multer(uploadConfig.MULTER);

ingredientsRoutes.use(ensureAuthentication);

ingredientsRoutes.post("/:food_id", ingredientsController.create);
ingredientsRoutes.patch("/picture/:id", upload.single("picture"), ingredientsController.update);
ingredientsRoutes.get("/:food_id", ingredientsController.index);
ingredientsRoutes.delete("/:id", ingredientsController.delete);

module.exports = ingredientsRoutes;