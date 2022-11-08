const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/carritos.txt");
    console.log('Archivo: base de datos conectada');
  }

  guardarProducto = async (id, obj) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        carrito.productos.push(obj);
        await this.actualizar(carrito);
        return carrito;
      } else {
        return [];
      }
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
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

      await this.actualizar({ ...carrito, productos: productos });

      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };
}

module.exports = CarritosDaoArchivo;
