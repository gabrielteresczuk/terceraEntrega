// npm i firebase-admin
const admin = require("firebase-admin");
const serviceAccount = require("../firestore/coderhouse-backend-5daf9-firebase-adminsdk-aqm1t-37d134ffc8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

class ContenedorFireStore {
  constructor(coll) {
    this.coll = coll;
    this.coneccion();
    this.query = db.collection(coll);
  }

  coneccion = async () => {
    console.log("Firestore: base de datos conectada");
  };

  guardar = async (obj) => {
    try {
      let guardar = await this.query.add(obj);
      return guardar.id;
    } catch (error) {
      console.log("Guardar - ocurrio un error: " + error);
    } finally {
    }
  };

  listarPorId = async (id) => {
    try {
      let datos = await this.query.doc(id).get();
      let newDatos = { ...datos.data(), id: datos.id };
      return newDatos;
    } catch (error) {
      return "ListarPorId - No se pudo consultar:" + error;
    } finally {
    }
  };

  listarTodo = async () => {
    try {
      let querySnapshot = await this.query.get();
      let docs = querySnapshot.docs;
      let newDatos = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return newDatos;
    } catch (error) {
      return [];
    } finally {
    }
  };

  borrarPorId = async (id) => {
    try {
      let datos = await this.query.doc(id).delete();
      return datos;
    } catch (error) {
      console.log("Ocurrio un error al eliminar: " + error);
    } finally {
    }
  };

  borrarTodo = async () => {
    try {
      let querySnapshot = await this.query.get();
      let docs = querySnapshot.docs;
      for (const doc of docs) {
        await this.query.doc(doc.id).delete();
      }
      return "datos eliminados";
    } catch (error) {
      console.log("BorrarTodo - ocurrio un error:" + error);
    } finally {
    }
  };

  actualizar = async (obj) => {
    try {
      await this.query.doc(obj.id).update(obj);
      return obj.id;
    } catch (error) {
      console.log("Actualizar -ocurrio un error:" + error);
    }
  };
}

module.exports = ContenedorFireStore;
