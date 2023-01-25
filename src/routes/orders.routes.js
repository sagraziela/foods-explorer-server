const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthentication);

ordersRoutes.post("/:user_id", ordersController.create);
ordersRoutes.put("/:id", ordersController.update);
ordersRoutes.get("/:user_id?", ordersController.index);
//ordersRoutes.get("/:id", ordersController.show);


module.exports = ordersRoutes;