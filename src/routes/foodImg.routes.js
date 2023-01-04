const { Router } = require('express');
const FoodsPictureController = require('../controllers/FoodsPictureController');
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const foodsImgRoutes = Router();
const foodsPictureController = new FoodsPictureController();
const upload = multer(uploadConfig.MULTER);

foodsImgRoutes.use(ensureAuthentication);

foodsImgRoutes.post("/", upload.single("picture"), foodsPictureController.create);

module.exports = foodsImgRoutes;