
class ContenedorMemoria {

    constructor(){
        this.elementos = [];
    }

    proximoID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(el => el.id);
            const max = Math.max.apply(null, ids);
            return max+1;
        }else{
            return 1;
        }
    }

    guardar = async (obj) =>{
        try {
            let datos = await this.listarTodo();
            let proximoId = this.proximoID(datos);
            obj = {...obj,id:proximoId};
            this.elementos.push(obj);
            return proximoId;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    listarPorId = async (id) =>{
        try {
            let producto = this.elementos.find(el => el.id === parseInt(id));
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = async () =>{
        try {
            return [...this.elementos];
        } catch (error) {
            return [];
        }
    }

    borrarPorId = async (id) =>{
        try {
            let nuevosDatos = this.elementos.filter(producto => producto.id !== parseInt(id));
            this.elementos = [...nuevosDatos];
            return `id ${id} eliminado`
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }
    }

    borrarTodo = async () => {
        try {
            this.elementos = [];
            return 'todos los elementos eliminados';
        } catch (error) {
            console.log('deleteAll - ocurrio un error:' + error);
        }
    }

    actualizar = async (obj)=>{
        try {
            let nuevoDatos = this.elementos.map(el => el.id === obj.id ? obj:el);
            this.elementos = nuevoDatos;
        } catch (error) {
            console.log('Actualizar - error al actualizar')
        }
    }

}

module.exports = ContenedorMemoria;