const express = require('express')
const { Server: HttpServer } = require('http')

//const routesProducts = require('./')

const app = express()
const httpServer = new HttpServer(app)

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//no se si esto esta bien
const routesProducts = require('./routes/routesProducts')
const routesCart = require('./routes/routesCart')
app.use('/api/products', routesProducts)
app.use('/api/cart', routesCart)

//app.set('view engine', 'ejs');
app.set('views','./public/views');





const PORT = 8080 
httpServer.listen(PORT, () => console.log('Servidor corriendo en http://localhost:8080'))