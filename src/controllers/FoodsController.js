const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/diskStorage");

class FoodsController {
    async create(request, response) {
        const {title, category, description, price, ingredients } = request.body;
        const user_id = request.user.id;

        const user = await knex("users").where({ id: user_id});

        if (!user || user.admin === 0) {
            throw new AppError("Usuário não autorizado.");
        }

        const foodNameExists = await knex("foods").where({ title });

        if(foodNameExists.length > 0) {
            throw new AppError(`'${foodNameExists}' já existe no cardápio. Defina um nome diferente para continuar.`);
        }

        const food_id = await knex("foods").insert({
            title,
            category,
            description,
            price,
            created_by: user.name
        })

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                name: ingredient.name,
                food_id
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        const foodCreated = await knex("foods").where({id: food_id}).first()

        return response.status(201).json({
            ...foodCreated,
            ingredients: ingredientsInsert
        });
    }

    async update(request, response) {
        const { title, category, description, price } = request.body;
        const { id } = request.params;
        const user_id = request.user.id;

        const user = await knex("users").where({ id: user_id});

        if (!user || user.admin === 0) {
            throw new AppError("Usuário não autorizado.");
        }

        const food = await knex("foods").where({ id });

        if(!food) {
            throw new AppError("O prato pesquisado não foi encontrado.")
        }

        food.title = title ?? food.title;
        food.category = category ?? food.category;
        food.description = description ?? food.description;
        food.price = price ?? food.price;

        await knex("foods").update({
            title: food.title,
            category: food.category,
            description: food.description,
            price: food.price,
            updated_by: user.name
        }).where({ id });

        const updatedFood = await knex("foods").where({ id });

        return response.json(updatedFood[0]);
    }

    async show(request, response) {
        const { id } = request.params;

        const food = await knex("foods").where({ id });

        if(!food) {
            throw new AppError("Refeição não encontrada.");
        };
        
        const ingredients = await knex("ingredients").where({ food_id: id });

        return response.json({
            ...food[0],
            ingredients
        })
    }

    async index(request, response) {
        const { userSearch } = request.query;

        if (!userSearch) {
            const allFoods = await knex("foods");
            return response.json(allFoods)

        } else {
            const ingredients = await knex("ingredients");

            const foodsByTitle = await knex("foods")
                .whereLike("title", `%${userSearch}%`)
                .orderBy("title");
            
            if(foodsByTitle[0]) {
                const filteredFoodsByTitle = foodsByTitle.map(food => {
                    const ingredientTags = ingredients.filter(ingredient => ingredient.food_id === food.id);
                    
                    return {
                        ...food,
                        ingredients: ingredientTags
                    }
                })
    
                return response.json(filteredFoodsByTitle);
    
            } else {
                const foodsByIngredient = await knex("ingredients")
                    .select([
                        "foods.id",
                        "foods.title",
                        "foods.picture",
                        "foods.category",
                        "foods.description",
                        "foods.price",
                    ])
                    .whereLike("ingredients.name", `%${userSearch}%`)
                    .innerJoin("foods", "foods.id", "ingredients.food_id")
                    .orderBy("foods.title");
    
                const filteredFoodsByIngredients = await foodsByIngredient.map(food => {
                    const ingredientTags = ingredients.filter(ingredient => ingredient.food_id === food.id);
    
                    return {
                        ...food,
                        ingredients: [ingredientTags]
                    }
                })
    
                return response.json(filteredFoodsByIngredients);
            } 
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        const user = await knex("users").where({ id: user_id});

        if (!user || user.admin === 0) {
            throw new AppError("Usuário não autorizado.");
        }

        await knex("foods").where({ id }).delete();

        return response.json();
    }
}

module.exports = FoodsController;
