const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

if(process.env.ambiente === "fs"){

    const { routesProductsFS, routesCartFS} = require('./src/api/routes/routesFS')
    app.use('/api/products', routesProductsFS)
    app.use('/api/cart', routesCartFS)
}

if(process.env.ambiente === "mongo"){

    const { routesProductsMongo, routesCartMongo} = require('./src/api/routes/routesMongo')
    app.use('/api/products', routesProductsMongo)
    app.use('/api/cart', routesCartMongo)
}

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})
    
module.exports = app