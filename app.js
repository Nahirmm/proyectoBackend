const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')
const urlMongo= process.env.DB



app.use(express.urlencoded({extended: true}))
app.use(express.json())

if(process.env.ambiente === "fs"){

    const { routesProductsFS, routesCartFS} = require('./src/api/routes/routesFS')
    app.use('/api/products', routesProductsFS)
    app.use('/api/cart', routesCartFS)
}

if(process.env.ambiente === "mongo"){

    mongoose.connect(urlMongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => console.log("Conectado a MongoDB"))

    const { routesProductsMongo, routesCartMongo} = require('./src/api/routes/routesMongo')
    app.use('/api/products', routesProductsMongo)
    app.use('/api/cart', routesCartMongo)
}

if (process.env.ambiente === "firebase") {
    const { routesProductsFirebase, routesCartFirebase } = require('./src/api/routes/routesFirebase')
    app.use('/api/products', routesProductsFirebase)
    app.use('/api/cart', routesCartFirebase)
}

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})
    
module.exports = app