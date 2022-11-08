const ContenedorFireStore = require("../../contenedores/ContenedorFireStore");


class CarritosDaoFirestore extends ContenedorFireStore {
    constructor() {
      super('carritos');
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
            if (carrito.productos) {
              return carrito.productos;
            } else {
              return [];
            }
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
            (producto) => producto.id !== id_prod
          );
          carrito.productos = productos;
          await this.actualizar(carrito);
          return { delete: id_prod };
        } catch (error) {
          console.log("BorrarProductoPorId Ocurrio un error : " + error);
        }
      };

  }


  module.exports = CarritosDaoFirestore;