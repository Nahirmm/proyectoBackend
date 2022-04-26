const express = require('express')
const app = express()
const { routesProducts, routesCart} = require('./src/api/routes/routesFS')


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/products', routesProducts)
app.use('/api/cart', routesCart)


app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})
    
module.exports = app