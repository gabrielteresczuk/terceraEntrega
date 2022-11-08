function checkAutenticate(req,res,next){
    if(req.isAuthenticated()){
      //console.log('autenticado');
      next();
    }else{
      //console.log('no autenticado');
      res.sendStatus(401);
    }
  
  }

  module.exports = checkAutenticate;