const express = require("express");
const app = express();
require("dotenv").config();                   // -> .env
const path = require("path");
const logger = require('./logger/logger.js'); // -> logger

/* ------------- CLUSTER ------------ */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/* -------- HABILITAMOS CORS -------- */

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

/* ----------- middelwares ---------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./build")));

/* ------------- session ------------ */

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  store: MongoStore.create({
      mongoUrl:'mongodb+srv://gabriel:gabriel@cluster0.9qtkfe7.mongodb.net/ecommerce?retryWrites=true&w=majority',
      mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true}
  }),
  secret:'shh',
  resave: false,
  saveUninitialized: false,
  rolling: true,                  //-> actualiza la session
  cookie: {
      maxAge: 1000 * 60 * 10      //-> ms * seg * min               
  }
}))

/* ------------ passport ------------ */

const passport = require('./routes/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* -------------- RUTAS ------------- */

const productos = require('./routes/productos.js');
const carritos = require('./routes/carritos.js');
const extras = require('./routes/extras.js');
const login = require('./routes/login.js');

app.use(productos);
app.use(carritos);
app.use(login);
app.use(extras);

/* ------------ listener ------------ */

const modo = process.env.MODO || "FORK";
const port = process.env.PORT || 8080;

if(cluster.isMaster){
  logger.log('info', `ARGUMENTOS puerto: ${port} - modo: ${modo}`);
  logger.log('info', 'master '+process.pid +' is running');

  if (modo === 'CLUSTER'){
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

      cluster.on('exit',(worker,code,signal)=>{
          logger.log('info', `worker ${worker.process.pid} died`);
      })
  }else{
      const server = app.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
      server.on('error',(error)=>{logger.log('error', 'hubo un error '+error)});
  }

}else{

  const server = app.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
  server.on('error',(error)=>{logger.log('error', 'hubo un error '+error)});

}

