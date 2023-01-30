
exports.up = knex => knex.schema.createTable("restaurant", table => {
    table.increments("id"),
    table.text("name"),
    table.text("address"),
    table.integer("phone_number"),

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("restaurant");
