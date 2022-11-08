//npm i mongoose
const mongoose = require('mongoose');


class ContenedorMongodb {

    constructor(url,modelo){
        this.url = url;
        this.modelo = modelo;
        this.coneccion();
    }

    coneccion = async ()=>{
        await mongoose.connect(this.url ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        //console.log('MongoDB: base de datos conectada');
    }

    guardar = async (obj) =>{
        try {
            let guardar = await new this.modelo(obj).save();
            return guardar._id.toString();
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }finally{
        }
    }

    listarPorId = async (id) =>{
        try {
            let datos = await this.modelo.findOne({_id:id});
            let newDatos = {...datos._doc,id:datos._id.toString()}
            return newDatos;

        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }finally{
        }
    }

    
    listarTodo = async () =>{
        try {
            let datos = await this.modelo.find({});
            let newDatos = datos.map(el=> {
                return {...el._doc,id:el._id.toString()}
            })
            return newDatos;
        } catch (error) {
            return [];
        }finally{
        }
    }

    borrarPorId = async (id) =>{
        try {
            let datos = await this.modelo.deleteOne({_id:id});
            return datos;
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }finally{
        }
    }

    borrarTodo = async () => {
        try {
            let datos = await this.modelo.deleteMany({});
            return datos;
        } catch (error) {
            console.log('BorrarTodo - ocurrio un error:' + error);
        }finally{
        }
    }

    actualizar = async (obj)=>{
        try {
            await this.modelo.updateOne({_id:obj.id},{$set:{...obj}})
            return obj.id
        } catch (error) {
            console.log('Actualizar -ocurrio un error:' +error);
        }
    }

}



module.exports = ContenedorMongodb