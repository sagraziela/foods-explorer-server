const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const favoritesRoutes = Router();
const favoritesController = new FavoritesController;

favoritesRoutes.use(ensureAuthentication);

favoritesRoutes.post("/:id", favoritesController.create); //user_id
favoritesRoutes.get("/:id", favoritesController.index); //user_id
favoritesRoutes.delete("/:id", favoritesController.delete); //fav_id

module.exports = favoritesRoutes;
