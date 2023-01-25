const { Router } = require("express");
const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const favoritesRoutes = Router();
const favoritesController = new FavoritesController;

favoritesRoutes.use(ensureAuthentication);

favoritesRoutes.post("/:user_id", favoritesController.create);
favoritesRoutes.get("/:user_id", favoritesController.index); 
favoritesRoutes.delete("/:id", favoritesController.delete); //fav_id

module.exports = favoritesRoutes;
