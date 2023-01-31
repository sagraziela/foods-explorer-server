const knex = require("../database/knex/");
const AppError = require("../utils/AppError");

class RestaurantController {
    async create (request, response) {
        const { name, address, phone_number } = request.body;
        const user_id = request.user.id;

        console.log(name, address, phone_number)

        if(!name) {
            throw new AppError("O nome é obrigatório");
        };

        const nameExists = await knex("users").where({ name }).first();

        if(nameExists) {
            throw new AppError("Esse nome já está cadastrado em nosso banco de dados. Por favor, informe outro nome para continuar o seu cadastro.");
        };

        const requestingUser = await knex("users").where({ id: user_id })

        if (user_id && requestingUser.admin !== 1) {
            throw new AppError("É necessária autorização de um administrador.");
        }

        const id = await knex("restaurant").insert({
            name,
            address, 
            phone_number
        })
        console.log(id)

        const restaurant = await knex("restaurant").where({ id })
    
        return response.status(201).json(restaurant);
    }

    async update (request, response) {
        const { name, address, phone_number } = request.body;
        const { id } = request.params;

        const restaurant = await knex("restaurant").where({ id });

        if(!restaurant) {
            throw new AppError("Restaurante não encontrado");
        };

        restaurant.name = name ?? restaurant.name;
        restaurant.address = address ?? restaurant.address;
        user.phone_number = phone_number ?? restaurant.phone_number;

        await knex("restaurant").update({
            name: restaurant.name,
            address: restaurant.address,
            phone_number: restaurant.phone_number
        }).where({ id })

        return response.json();
    }

    async show(request, response) {
        const { user_id } = request.user.id;

        if (!user_id) {
            throw new AppError("Você não tem permissão para acessar as informações solicitadas.");
        }

        const restaurant = await knex("restaurant").first();

        if(!food) {
            throw new AppError("Restaurante não encontrado.");
        };

        return response.json(restaurant)
    }
}

module.exports = RestaurantController;