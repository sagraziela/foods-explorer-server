const knex = require("../database/knex");
const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/AppError");


class FoodsPictureController {
    async update (request, response) {
        const { id } = request.params;
        const foodImg = request.file.filename;
        const user_id = request.user.id;

        const user = await knex("users").where({ id: user_id});

        if (!user || user.admin === 0) {
            throw new AppError("Usuário não autorizado.");
        }

        const diskStorage = new DiskStorage();

        const picture = await diskStorage.save(foodImg);

        const food = await knex("foods").where({ id });

        const updatedFood = await knex("foods").update({
            title: food.title,
            category: food.category,
            description: food.description,
            price: food.price,
            picture
        }).where({ id });

        return response.json(updatedFood);
    }
}

module.exports = FoodsPictureController;