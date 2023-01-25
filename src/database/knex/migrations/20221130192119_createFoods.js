exports.up = knex => knex.schema.createTable("foods", table => {
    table.increments("id");
    table.text("title");
    table.text("category");
    table.text("description");
    table.real("price");
    table.text("picture").default(null);
    table.integer("isFav").default(0);

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("foods");
