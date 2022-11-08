// npm install knex sqlite3 mysql

class ContenedorSqlite3Mariadb {

    constructor(knex,tabla,esquema){
        this.knex = knex;
        this.tabla = tabla;
        this.esquema = esquema;
    }

    crearTabla = async () =>{

        try {

            let existe = await this.knex.schema.hasTable(this.tabla);
            if(existe){
                //console.log(`'${this.tabla}' ya existe`)
            }else{

                await this.knex.schema.createTable(this.tabla,(table) => {
                    this.esquema(table)
                });
                console.log(`'${this.tabla}' creada`);
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            //this.knex.destroy();
        }

    }

    guardar = async (obj) =>{
        try {
            await this.crearTabla();
            if(obj.hasOwnProperty('productos')){
                obj.productos='';
            }
            let guardar = await this.knex(this.tabla).insert(obj);
            return guardar[0];
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }finally{
           // this.knex.destroy();
        }
    }

    listarPorId = async (id) =>{
        try {
            let datos = await this.knex(this.tabla).select('*').where({id:id});
            return datos[0];

        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }finally{
           // this.knex.destroy();
        }
    }


    listarTodo = async () =>{
        try {
            let datos = await this.knex(this.tabla).select('*');
            return datos;
        } catch (error) {
            return [];
        }finally{
           // this.knex.destroy();
        }
    }

    borrarPorId = async (id) =>{
        try {
            await this.knex(this.tabla).where({id:id}).del()
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }finally{
           // this.knex.destroy();
        }
    }

    borrarTodo = async () => {
        try {
            await this.knex(this.tabla).del();

        } catch (error) {
            console.log('BorrarTodo - ocurrio un error:' + error);
        }finally{
           // this.knex.destroy();
        }
    }

    actualizar = async (obj)=>{
        try {
            await this.knex(this.tabla).where({id:obj.id}).update(obj);
            return obj.id
        } catch (error) {
            console.log('Actualizar -ocurrio un error:' +error);
        }
    }

}

module.exports = ContenedorSqlite3Mariadb;