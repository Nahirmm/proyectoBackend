const passport = require('passport')
const Strategy = require('passport-local').Strategy
const {User} = require('../models/user.js')
const {isValidPassword} = require('../utils/bcrypt.js')
const {createHash} = require('../utils/bcrypt.js')
const logger = require('../utils/winston.js')


passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

//-------LOGIN-------//
const strategyLogin = new Strategy(
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          logger.warn('Usuario no encontrado: ' + username);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          logger.warn('Contraseña invalida');
          return done(null, false);
        }
        return done(null, user);
      });
    })

//-------SIGNUP-------//
const strategySignup = new Strategy({
    passReqToCallback: true
   },
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {
   
        if (err) {
          logger.error('Error in SingUp: ' + err);
          return done(err);
        }
        
        if (user) {
            logger.info('El usuario ya existe');
            return done(null, false)
        }
   
        const newUser = {
            name: req.body.name,
            lastNames: req.body.lastNames,
            address: req.body.address,
            age: req.body.age,
            email: req.body.email,
            image: req.body.image,
            phone: req.body.phone,
            username: req.body.username,
            password: createHash(password),
        }
        
        User.create(newUser, (err, userWithId) => {
            if (err) {
              logger.error('Error al guardar el usuario: ' + err);
              return done(err);
            }
            logger.data(JSON.stringify(newUser))
            logger.info('El usuario se registró correctamente');
            return done(null, userWithId);
        });
    });
})

module.exports = { strategyLogin, strategySignup }