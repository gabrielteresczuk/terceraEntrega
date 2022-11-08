const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria: base de datos conectada');
  }

  guardarProducto = async (id, obj) => {
    let carrito = await this.listarPorId(id);
    if (carrito) {
      carrito.productos.push(obj);
      this.actualizar(carrito);
      return carrito;
    } else {
      return [];
    }
  };

  ListarProductosPorId = async (id) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        return carrito.productos;
      } else {
        return [];
      }
    } catch (error) {
      console.log("ListarProductosPorId - ocurrio un error: " + error);
    }
  };

  borrarProductoPorId = async (id, id_prod) => {

    try {
      let carrito = await this.listarPorId(id);
      let productos = carrito.productos.filter(
        (producto) => producto.id !== parseInt(id_prod)
      );
      this.actualizar({ ...carrito, productos: productos });
      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };
}

module.exports = CarritosDaoMemoria;
