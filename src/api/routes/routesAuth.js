const express =  require('express')
const routesAuth = express.Router()
const passport = require('passport')
const controlAuth = require('../controllers/controllersAuth')
const controllerAuth = controlAuth.getInstance()
const isAuth = require('../middleware/isAuth')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })

//INDEX
routesAuth.get('/', isAuth, controllerAuth.products)

//LOGIN
routesAuth.get('/login', controllerAuth.login)
routesAuth.post('/login', passport.authenticate('login', {failureRedirect: '/auth/error-login'}), controllerAuth.redirect)

//SIGNUP
routesAuth.get('/signup', controllerAuth.signup)
routesAuth.post('/signup', upload.single('image'), passport.authenticate('signup', {failureRedirect: '/auth/error-signup'}), controllerAuth.redirect)
//LOGOUT
routesAuth.get('/logout', isAuth, controllerAuth.logout)

//FAIL ROUTE
routesAuth.get('/error-login', controllerAuth.errorLogin)
routesAuth.get('/error-signup', controllerAuth.errorSignup)


module.exports = { routesAuth }