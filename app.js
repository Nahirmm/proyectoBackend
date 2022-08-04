const express = require('express')
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

const passport = require('passport')
const { strategyLogin, strategySignup } = require('./src/api/middleware/passportLocal.js')

passport.use('login', strategyLogin);
passport.use('signup', strategySignup)

const { routesProducts } = require('./src/api/routes/routesProducts')
const { routesCart} = require('./src/api/routes/routesCart')
const { routesAuth } = require('./src/api/routes/routesAuth')
const sendEmail = require('./src/api/utils/nodemailer.js')
const sendSMS = require('./src/api/utils/twilioSMS.js')
const sendWhatsapp = require('./src/api/utils/twilioWsp.js')

//const { graphqlHTTP } = require('express-graphql') 
//const {schemaGraphQL} = require('./src/api/models/graphql')
//const graphQLRoot = require('./src/api/controllers/controllerGraphQL')

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', routesAuth)
app.use('/products', routesProducts)
app.use('/cart', routesCart)

/*app.use('/graphql', graphqlHTTP({
    schema: schemaGraphQL,
    rootValue: graphQLRoot,
    graphiql: true,
 }));*/
 

mongoose.connect(process.env.MONGODB)

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})

//sendEmail()
//sendSMS()
//sendWhatsapp()
    
module.exports = app