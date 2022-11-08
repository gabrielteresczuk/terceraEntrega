const ContenedorFireStore = require("../../contenedores/ContenedorFireStore");


class ProductosDaoFirestore extends ContenedorFireStore {
    constructor() {
      super('productos');
    }
  }
  

  module.exports = ProductosDaoFirestore;