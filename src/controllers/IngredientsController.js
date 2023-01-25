const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");

class IngredientsController {
    async create(request, response) {
        const { ingredients } = request.body;
        const { food_id } = request.params;

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                name: ingredient.name,
                food_id
            }
        })

        const id = await knex("ingredients").insert(ingredientsInsert);

        const newIngredient = await knex("ingredients").where({ id })

        return response.json(newIngredient)
    };

    async update(request, response) {
        const { id } = request.params;
        const ingredientImg = request.file.filename;

        const ingredient = await knex("ingredients").where({ id });

        const diskStorage = new DiskStorage();

        const picture = await diskStorage.save(ingredientImg);

        await knex("ingredients").update({
            name: ingredient.name,
            food_id: ingredient.food_id,
            picture: picture
        }).where({ id });

        return response.json(ingredient);
    }

    async index(request, response) {
        const { food_id } = request.params;
        
        const allIngredients = await knex("ingredients").where({ food_id });

        return response.json(allIngredients)
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("ingredients").where({ id }).delete()

        return response.json();
    }
}

module.exports = IngredientsController;