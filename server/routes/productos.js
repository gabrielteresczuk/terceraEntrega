const express = require("express");
const { Router } = express;
const router = Router();
const logger = require('../logger/logger.js'); // -> logger

/* ------- data access object ------- */

const {Producto} = require("../daos/index.js");
const Productos = new Producto();

/* ---------- api/productos --------- */

/* ------- productos filtrados ------ */

router.get("/api/productos/precio/:valor?", (req, res) => {
  logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
      const { valor } = req.params;

      Productos.listarTodoPrecio(valor).then((data) => {
        res.json(data);
      });

  });

// GET trae 1 o todos los productos
router.get("/api/productos/:id?", (req, res) => {
  logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const { id } = req.params;
  
    if (id) {
      Productos.listarPorId(id).then((data) => {
        res.json(data);
      });
    } else {
      Productos.listarTodo().then((data) => {
        res.json(data);
      });
    }
  });

  // POST crea 1 producto
  router.post("/api/productos", (req, res) => {
    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const {administrador} = req.body;

    if (administrador) {
      let timestamp = Date.now();
  
      Productos.guardar({ timestamp, ...req.body }).then((data) => {
        res.json({ id: data });
      });
    } else {
      res.json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`,
      });
    }
  });
  
  // PUT modifica 1 producto
  router.put("/api/productos/:id", (req, res) => {
    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const {administrador} = req.body;

    if (administrador) {
      const { id } = req.params;
      let timestamp = Date.now();
  
      Productos.actualizar({ id: id, timestamp, ...req.body }).then((data) => {
        res.json({ id: data });
      });
    } else {
      res.json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`,
      });
    }
  });
  
  // DELETE borra 1 producto
  router.delete("/api/productos/:id", (req, res) => {
    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const {administrador} = req.body;

    if (administrador) {
      const { id } = req.params;
  
      Productos.borrarPorId(id).then((data) => {
        res.json({ delete: data });
      });
    } else {
      res.json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`,
      });
    }
  });





  module.exports = router;

  