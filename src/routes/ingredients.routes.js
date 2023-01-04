const { Router } = require("express");
const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ingredientsRoutes = Router();
const ingredientsController = new IngredientsController();
const upload = multer(uploadConfig.MULTER);

ingredientsRoutes.use(ensureAuthentication);

ingredientsRoutes.patch("/picture/:id", upload.single("picture"), ingredientsController.update);
ingredientsRoutes.get("/:id", ingredientsController.index);

module.exports = ingredientsRoutes;