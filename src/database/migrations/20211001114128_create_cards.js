exports.up = function (knex) {
  return knex.schema.createTable("cards", function (table) {
    table.increments("id").notNull().primary();
    table.string("titulo").notNullable();
    table.string("pessoa").notNullable();
    table.string("conteudo").notNullable();
    table.string("prazo").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cards");
};
