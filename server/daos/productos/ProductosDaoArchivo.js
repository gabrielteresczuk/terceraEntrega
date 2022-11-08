const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/productos.txt");
    console.log('Archivo: base de datos conectada');
  }
}

module.exports = ProductosDaoArchivo;
