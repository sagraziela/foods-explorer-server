
exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments("id");
    table.text("fav_food").notNullable();
    table.integer("user_id").references("id").inTable("users").notNullable();
})

exports.down = knex => knex.schema.dropTable("favorites");
