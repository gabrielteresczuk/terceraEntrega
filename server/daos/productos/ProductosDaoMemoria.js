const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria: base de datos conectada');
  }
}

module.exports = ProductosDaoMemoria;
