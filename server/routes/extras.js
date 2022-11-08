const express = require("express");
const { Router } = express;
const router = Router();
const path = require("path");

// cualquier ruta que no exista
router.get("/api/*", (req, res) => {
    res.json({
      error: -2,
      descripcion: `ruta '${req.path}' método '${req.method}' no implementada`,
    });
  });
  
  // sin este PATH, no podes actualizar las paginas
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../build/index.html"));
  });

  
  module.exports = router;