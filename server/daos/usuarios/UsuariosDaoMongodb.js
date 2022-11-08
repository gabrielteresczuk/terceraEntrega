const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const mongoose = require("mongoose");
const {mongodbConfig} = require('../../config.js');

const usuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  edad: { type: Number, require: true },
  telefono: { type: String, require: true },
  avatar: { type: String, require: true }
});

const usuarios = mongoose.model(usuariosCollection, UsuariosSchema);

class UsuariosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, usuarios);
  }

  buscar = async (obj)=>{
    try {
        let datos = await this.modelo.findOne({username:obj.username});
        return datos;
    } catch (error) {
        console.log('Buscar -ocurrio un error:' +error);
    }
  }
  
}

module.exports = UsuariosDaoMongodb;
