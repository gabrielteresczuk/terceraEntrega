const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../config.js');

const knexSqlite = require("knex")(sqlite3Config);

let esquema = (table) => {
  table.increments("id");
  table.string("timestamp");
  table.string("nombre");
  table.string("descripcion");
  table.string("codigo");
  table.string("foto");
  table.integer("precio");
  table.integer("stock");
};

class ProductosDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "productos", esquema);
    console.log('Sqlite3: base de datos conectada');
  }
}

module.exports = ProductosDaoSqlite3;
