const { Router } = require("express");
const sessionsRoutes = require("./sessions.routes");
const usersRoutes = require("./users.routes");
const ordersRoutes = require("./orders.routes");
const foodsRoutes = require("./foods.routes");
const ingredientsRoutes = require("./ingredients.routes");
const restaurantRoutes = require("./restaurant.routes");
const favoritesRoutes = require("./favorites.routes");

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/foods", foodsRoutes);
routes.use("/ingredients", ingredientsRoutes);
routes.use("/restaurant", restaurantRoutes);
routes.use("/favorites", favoritesRoutes);

module.exports = routes;