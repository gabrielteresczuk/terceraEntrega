const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const mongoose = require("mongoose");
const {mongodbConfig} = require('../../config.js');

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  timestamp: { type: String, require: true },
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  codigo: { type: String, require: true },
  foto: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
});

const productos = mongoose.model(productosCollection, ProductosSchema);

class ProductosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, productos);
  }


  listarTodoPrecio = async (valor) =>{
    try {
        let datos;
        if(valor === '0'){
          datos = await this.modelo.find({});
        }else{
          datos = await this.modelo.find({}).sort({precio:valor});
        }
        let newDatos = datos.map(el=> {
            return {...el._doc,id:el._id.toString()}
        })
        return newDatos;
    } catch (error) {
        return [];
    }finally{
    }
}

}

module.exports = ProductosDaoMongodb;
