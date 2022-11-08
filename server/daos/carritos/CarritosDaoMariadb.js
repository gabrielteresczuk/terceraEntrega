const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../config.js');

const knexMariadb = require("knex")(mariadbConfig);

let esquema = (table) => {
  table.increments("id");
  table.string("timestamp");
  table.text("productos");
};

class CarritosDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "carritos", esquema);
    console.log('Mariadb: base de datos conectada');
  }

  guardarProducto = async (id, obj) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        carrito.productos.push(obj);
        carrito.productos = JSON.stringify(carrito.productos);
        await this.actualizar(carrito);
        return carrito;
      } else {
        return [];
      }
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  listarTodo = async () => {
    try {
      let datos = await this.knex(this.tabla).select("*");
      let newDatos = datos.map((el) => {
        if (el.productos) {
          el.productos = JSON.parse(el.productos);
        }
        return el;
      });
      return newDatos;
    } catch (error) {
      return [];
    } finally {
      // this.knex.destroy();
    }
  };

  listarPorId = async (id) => {
    try {
      let datos = await this.knex(this.tabla).select("*").where({ id: id });
      datos[0].productos = datos[0].productos
        ? JSON.parse(datos[0].productos)
        : [];
      return datos[0];
    } catch (error) {
      return "ListarPorId - No se pudo consultar:" + error;
    } finally {
      // this.knex.destroy();
    }
  };

  ListarProductosPorId = async (id) => {
    try {
      let carrito = await this.listarPorId(id);
      //console.log(carrito);
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
      productos = JSON.stringify(productos);

      await this.actualizar({ ...carrito, productos: productos });

      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };
}

module.exports = CarritosDaoMariadb;
