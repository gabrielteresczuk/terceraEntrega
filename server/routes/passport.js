const passport = require("passport");                       //-> passport
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia
const bCrypt = require("bcrypt");                           //-> encriptado
const logger = require('../logger/logger.js');              // -> logger

/* ---- persistencia de USUARIOS ---- */

const UsuariosDaoMongodb = require("../daos/usuarios/UsuariosDaoMongodb.js");
const usuarios = new UsuariosDaoMongodb();

/* ---------- serializacion --------- */

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* ------------ funciones ----------- */

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* ----------- middelware ----------- */

passport.use("login",
  new LocalStrategy(async (username, password, done) => {
    try {
      //buscamos el usuario en la DB
      let user = await usuarios.buscar({ username: username });

      if (user) {
        if (isValidPassword(user, password)) {
          // usuario valido, pasa!
          return done(null, user);
        } else {
          // password incorrecto
          return done(null, false);
        }
      } else {
        // no existe el usuario
        return done(null, false);
      }
    } catch (error) {
      logger.log('error', `Passport - login Strategy - ` + error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let datos = await usuarios.buscar({ username: username });
        if (datos) {
          return done(null, false,{ message: 'Incorrect username or password.' });
        } else {
          let { username, password} = req.body;
          let avatar = req.file.filename;
          // creamos el nuevo usuario
          let user = await usuarios.guardar({
            ...req.body,
            password: createHash(password),
            avatar:avatar
          });
          console.log(user);
          let datos = await usuarios.listarPorId(user);
          return done(null, datos);
        }
      } catch (error) {
        logger.log('error', `Passport - Singup Strategy - ` + error);
      }
    }
  )
);



module.exports = passport;