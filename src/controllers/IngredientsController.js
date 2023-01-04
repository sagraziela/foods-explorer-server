const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/AppError");


class IngredientsController {
    async update(request, response) {
        const { id } = request.params;
        const ingredientImg = request.file.filename;

        const ingredient = await knex("ingredients").where({ id });
        console.log(request.file)

        const diskStorage = new DiskStorage();

        const picture = await diskStorage.save(ingredientImg);

        await knex("ingredients").update({
            name: ingredient.name,
            food_id: ingredient.food_id,
            picture: picture
        }).where({ id });
        
        console.log(ingredient)

        return response.json(ingredient);
    }

    async index(request, response) {
        const { id } = request.params;
        
        const allIngredients = await knex("ingredients").where({ food_id: id });

        return response.json(allIngredients)
    }
}

module.exports = IngredientsController;