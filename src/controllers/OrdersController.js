const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
    async create(request, response) {
        const { items, user_id } = request.body;

        const orderId = await knex("orders").insert({ 
            items,
            user_id 
        })

        const order = await knex("orders").where({ id: orderId });

        return response.json(order);
    }

    async update(request, response) {
        const { status } = request.body;
        const { id } = request.params;

        const order = await knex("orders").where({ id });

        if(!order) {
            throw new AppError("O pedido pesquisado não foi encontrado.")
        }

        order.status = status ?? order.status;

        const updatedOrder = await knex("orders").update({
            status: order.status,
        }).where({ id });

        console.log(updatedOrder)

        return response.json(updatedOrder);
    }

    async index(request, response) {
        const { user_id } = request.params;

        let orders;

        if (user_id !== undefined) {
            orders = await knex("orders").where({ user_id }).orderBy("created_at", "desc");
        } else {
            orders = await knex("orders").orderBy("created_at", "desc");
        }

        return response.json(orders)
    }
}

module.exports = OrdersController;