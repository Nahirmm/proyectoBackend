const express =  require('express')
const routesAuth = express.Router()
const passport = require('passport')

const controllerAuth = require('../controllers/controllersAuth.js')
const isAuth = require('../middleware/isAuth')


//INDEX
routesAuth.get('/', isAuth, controllerAuth.products)

//LOGIN
routesAuth.get('/login', controllerAuth.login)
routesAuth.post('/login', passport.authenticate('login', {failureRedirect: '/auth/error-login'}), controllerAuth.redirect)

//SIGNUP
routesAuth.get('/signup', controllerAuth.signup)
routesAuth.post('/signup', passport.authenticate('signup', {failureRedirect: '/auth/error-signup'}), controllerAuth.redirectLogin)

//LOGOUT
routesAuth.get('/logout', isAuth, controllerAuth.logout)

//FAIL ROUTE
routesAuth.get('/error-login', controllerAuth.errorLogin)
routesAuth.get('/error-signup', controllerAuth.errorSignup)


module.exports = { routesAuth }