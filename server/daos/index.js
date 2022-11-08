require("dotenv").config();
const CarritoDaoMemoria = require('./carritos/CarritosDaoMemoria.js');
const CarritoDaoArchivo = require('./carritos/CarritosDaoArchivo.js');
const CarritoDaoSqlite3 = require('./carritos/CarritosDaoSqlite3.js');
const CarritoDaoMariadb = require('./carritos/CarritosDaoMariadb.js');
const CarritoDaoMongodb = require('./carritos/CarritosDaoMongodb.js');
const CarritoDaoFireStore = require("./carritos/CarritosDaoFireStore.js");

const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js');
const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
const ProductosDaoSqlite3 = require('./productos/ProductosDaoSqlite3.js');
const ProductosDaoMariadb = require('./productos/ProductosDaoMariadb.js');
const ProductosDaoMongodb = require('./productos/ProductosDaoMongodb.js');
const ProductosDaoFireStore = require('./productos/ProductosDaoFireStore.js');

// export condicional a la variable ENVIROMENT DAO

if(process.env.DAO === 'MEMORIA'){
    exports.Carrito = CarritoDaoMemoria;
    exports.Producto = ProductosDaoMemoria;
}else if(process.env.DAO === 'ARCHIVO'){
    exports.Carrito = CarritoDaoArchivo;
    exports.Producto = ProductosDaoArchivo;
}else if(process.env.DAO === 'SQLITE3'){
    exports.Carrito = CarritoDaoSqlite3;
    exports.Producto = ProductosDaoSqlite3;
}else if(process.env.DAO === 'MARIADB'){
    exports.Carrito = CarritoDaoMariadb;
    exports.Producto = ProductosDaoMariadb;
}else if(process.env.DAO === 'MONGODB'){
    exports.Carrito = CarritoDaoMongodb;
    exports.Producto = ProductosDaoMongodb;
}else if(process.env.DAO === 'FIRESTORE'){
    exports.Carrito = CarritoDaoFireStore;
    exports.Producto = ProductosDaoFireStore;
}



