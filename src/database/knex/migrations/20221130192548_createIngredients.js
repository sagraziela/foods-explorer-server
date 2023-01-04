
exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("picture").default(null);
    table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE");
}) 

exports.down = knex => knex.schema.dropTable("ingredients");
