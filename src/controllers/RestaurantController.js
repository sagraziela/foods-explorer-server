const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class RestaurantController {
    async create (request, response) {
        const { name, address, phone_number } = request.body;
        const user_id = request.user.id;

        if(!name) {
            throw new AppError("O nome é obrigatório");
        };

        const requestingUser = await knex("users").where({ id: user_id });

        if (requestingUser[0].admin !== 1) {
            throw new AppError("É necessária autorização de um administrador.");
        }

        await knex("restaurant").insert({
            name,
            address,
            phone_number
        });
    
        return response.status(201).json();
    }

    async update (request, response) {
        const { name, address, phone_number } = request.body;
        const { id } = request.params;

        const restaurant = await knex("restaurant").where({ id }).first();

        if(!restaurant) {
            throw new AppError("Restaurante não encontrado");
        };

        restaurant.name = name ?? restaurant.name;
        restaurant.address = address ?? restaurant.address;
        restaurant.phone_number = phone_number ?? restaurant.phone_number;

        await knex("restaurant").update({
            name: restaurant.name,
            address: restaurant.address,
            phone_number: restaurant.phone_number
        }).where({ id })

        return response.json();
    }

    async show(request, response) {
        const { user_id } = request.params;

        if (!user_id) {
            throw new AppError("Você não tem permissão para acessar as informações solicitadas.");
        }

        const restaurant = await knex("restaurant").first();

        if(restaurant === undefined) {
            return response.json();
        };

        return response.json(restaurant);
    }
}

module.exports = RestaurantController;