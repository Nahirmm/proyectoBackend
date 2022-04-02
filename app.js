const express = require('express')
const app = express()
const routesProducts = require('./routes/routesProducts')
const routesCart = require('./routes/routesCart')

app.use(express.static('public')) //DEJAR SI USO FRONT, SINO BORRAR
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/products', routesProducts)
app.use('/api/cart', routesCart)

//app.set('view engine', 'ejs');
app.set('views','./public/views');

module.exports = app