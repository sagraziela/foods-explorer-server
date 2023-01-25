
exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.text("items");
    table.text("status").default("Pendente");
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("orders");
