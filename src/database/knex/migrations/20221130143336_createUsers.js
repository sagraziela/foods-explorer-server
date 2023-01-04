
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.integer("password");
    table.integer("admin").notNullable().default(0);
    table.integer("phone_number").default(null);
    table.text("address").default(null);
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("users");
