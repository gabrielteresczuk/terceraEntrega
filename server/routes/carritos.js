const express = require("express");
const { Router } = express;
const router = Router();
const passport = require("./passport.js");
const logger = require("../logger/logger.js"); // -> logger
const checkAutenticate = require("./checkAutenticate.js"); // -> autentica con passport

/* ------- data access object ------- */
const { Producto } = require("../daos/index.js");
const Productos = new Producto();
const { Carrito } = require("../daos/index.js");
const Carritos = new Carrito();

/* ----------- MENSAJERIA ----------- */

const { nuevoPedido } = require("../api/nodemailer.js"); //-> MAIL
const { enviarSMS } = require("../api/twilio.js"); //-> SMS
const { enviarWSP } = require("../api/twilio.js"); //-> WSP

/* ---------- /api/carrito ---------- */

// POST crea 1 carrito
router.post("/api/carrito", checkAutenticate, (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  let timestamp = Date.now();
  Carritos.guardar({
    id_usuario: req.body.id_usuario,
    timestamp,
    productos: [],
    cerrado: false,
  }).then((data) => {
    res.json({
      id: data,
    });
  });
});

// Delete borra 1 carrito completo
router.delete("/api/carrito/:id", checkAutenticate, (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  const { id } = req.params;

  Carritos.borrarPorId(id).then((data) => {
    res.json({ delete: id });
  });
});

// GET - buscar el id del carrito por el usuario
router.get("/api/carrito/:id_usuario", checkAutenticate, (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  const { id_usuario } = req.params;
  Carritos.buscarCarritoPorUsuario(id_usuario).then((data) => {
    res.json(data);
  });
});

// POST - terminar una transaccion
router.post("/api/carrito/terminar", checkAutenticate, async (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  const { username, nombre, id_carrito } = req.body;
  let user = { username, nombre };

  try {
    let productos = await Carritos.ListarProductosPorId(id_carrito);
    await nuevoPedido(productos, user);           //-> enviar mail, FREE
    await enviarSMS(user);                        //-> enviar SMS, $$$$ COSTO
    await enviarWSP();                            //-> enviar ESP, $$$$ COSTO
    let data = await Carritos.terminarCarrito(id_carrito);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// GET lista de productos de 1 carrito
router.get("/api/carrito/:id/productos", (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  const { id } = req.params;
  Carritos.ListarProductosPorId(id).then((data) => {
    res.json(data);
  });
});

// POST guardar 1 producto en 1 carrito
router.post("/api/carrito/:id/productos", checkAutenticate, (req, res) => {
  logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
  const { id } = req.params;
  const { id_prod } = req.body;

  Productos.listarPorId(id_prod).then((productoData) => {
    Carritos.guardarProducto(id, productoData).then((data) => {
      res.json(data);
    });
  });
});

// DELETE borra 1 producto de 1 carrito
router.delete(
  "/api/carrito/:id/productos/:id_prod",
  checkAutenticate,
  (req, res) => {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const { id, id_prod } = req.params;

    Carritos.borrarProductoPorId(id, id_prod).then((data) => {
      res.json(data);
    });
  }
);

module.exports = router;
