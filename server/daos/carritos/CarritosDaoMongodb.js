const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const mongoose = require("mongoose");
const {mongodbConfig} = require('../../config.js');

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
  id_usuario: {type: String, require: true},
  timestamp: { type: String, require: true },
  productos: { type: Array, require: true },
  cerrado:{type: Boolean, require: true},
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);

class CarritosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, carritos);
  }

  guardarProducto = async (id, obj) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        carrito.productos.push(obj);
        await this.modelo.updateOne(
          { _id: id },
          { $set: { productos: carrito.productos } }
        );
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
      await this.modelo.updateOne(
        { _id: carrito.id },
        { $set: { productos: productos } }
      );
      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };

  buscarCarritoPorUsuario = async (id_usuario) =>{
    try {
      let carrito = await this.modelo.findOne({$and: [{id_usuario:id_usuario},{cerrado:false}]},{_id:1});
      if(carrito){
        return {id_carrito: carrito._id.toString()};
      }else{
        return null;
      }
      
    } catch (error) {
      console.log("buscarCarritoPorUsuario : " + error);
    }
  }

  terminarCarrito = async (id_carrito) => {
    try {

        await this.modelo.updateOne(
          { _id: id_carrito },
          { $set: { cerrado: true } }
        );
        return {msg:'ok'};

    } catch (error) {
      console.log("terminarCarrito - ocurrio un error: " + error);
    }
  };

  enviarCorreo = async (id_carrito) =>{
    try {
      let productos = await this.ListarProductosPorId(id_carrito);

      return productos;

    } catch (error) {
      console.log("Enviar Correo - ocurrio un error: " + error);
    }
  }


}

module.exports = CarritosDaoMongodb;
