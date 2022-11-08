/* -------- express y router -------- */
const express = require("express");
const { Router } = express;
const router = Router();
/* -------- passport SESSIONS ------- */
const passport = require('./passport.js');
/* ----------- NODEMAILER ----------- */
const {nuevoRegistro} = require('../api/nodemailer.js');
/* ------------- logger ------------- */
const logger = require('../logger/logger.js'); // -> logger

/* ------------- MULTER ------------- */

const multer = require('multer');

let storage = multer.diskStorage({
  destination:(req,file, cb)=>{
      cb(null,'build/uploads')
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now() + file.originalname)
  }
});

let upload = multer({storage:storage});


/* -------------- LOGIN ------------- */

router.get('/signin',(req,res)=>{
  logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
  //console.log(req.user);
  if(req.isAuthenticated()){
    logger.log('info', `User Logueado`);
      res.send(req.user);
  }else{
    logger.log('info', `User no Logueado`);
      res.send({})
  }
});

router.post('/signin',passport.authenticate('login'),(req,res)=>{
    logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
    res.send(req.user);
});

/* ------------- SIGNUP ------------- */

router.post('/signup',upload.single('avatar'),passport.authenticate('signup'),(req,res,next)=>{
  logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

  nuevoRegistro(req.body)     // ->  envio EMAIL

  const file= req.file;
  if(!file){
      res.send({file:'error'});
  }
  res.send({resp:'ok'});
});


/* ------------- LOGOUT ------------- */

router.get('/logout',(req,res)=>{
  logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
  //console.log(req.user);
  if(req.user){
  let {username} = req.user;
    req.logout(()=>{
      res.send({logout:username});
    });
  }else{
     res.send({logout:'ya deslogueado'});
  }

});

module.exports = router;
