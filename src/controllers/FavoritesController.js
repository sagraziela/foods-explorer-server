const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class FavoritesController {
    async create(request, response) {
        const { fav_food, user_id } = request.body;

        const favExists = await knex("favorites").where({ fav_food }).first();

        if (favExists) {
            throw new AppError("Esse prato já está na sua lista de favoritos.");
        }

        const foodExists = await knex("foods").where({ title: fav_food }).first();

        if(!foodExists) {
            throw new AppError("Esse prato não existe no cardápio.");
        }
        
        await knex("favorites").insert({ fav_food, user_id });

        return response.json();
    }

    async index(request, response) {
        const { user_id } = request.params;

        const favorites = await knex("favorites").where({ user_id });

        return response.json(favorites);
    }

    async delete (request, response) {
        const { id } = request.params;

        await knex("favorites").where({ id }).delete();

        return response.json();
    }
}

module.exports = FavoritesController;