const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../config.js');

const knexMariadb = require("knex")(mariadbConfig);

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

class ProductosDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "productos", esquema);
    console.log('Mariadb: base de datos conectada');
  }
}

module.exports = ProductosDaoMariadb;
