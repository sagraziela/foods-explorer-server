const { Router } = require("express");
const RestaurantController = require("../controllers/RestaurantController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const restaurantRoutes = Router();
const restaurantController = new RestaurantController();

restaurantRoutes.use(ensureAuthentication);

restaurantRoutes.post("/", restaurantController.create);
restaurantRoutes.put("/:id", restaurantController.update);
restaurantRoutes.get("/:user_id", restaurantController.show);

module.exports = restaurantRoutes;