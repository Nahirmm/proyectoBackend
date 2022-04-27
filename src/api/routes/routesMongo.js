const express =  require('express')
const routesProductsMongo = express.Router()
const routesCartMongo = express.Router()

const productsControllers = require('../controllers/products/productsControllerMongo')
const cartsControllers = require('../controllers/cart/cartControllersMongo')

const admin = require('../middleware/admin')
const adminRol = true

//RUTAS PRODUCTOS
routesProductsMongo.get('/', productsControllers.getAllProducts)
routesProductsMongo.get('/:id', productsControllers.getProductById)
routesProductsMongo.post('/', admin(adminRol), productsControllers.addProduct)
routesProductsMongo.put('/:id', admin(adminRol), productsControllers.updateProduct)
routesProductsMongo.delete('/:id', admin(adminRol), productsControllers.deleteProduct)

//RUTAS CARRITOS
routesCartMongo.post('/', cartsControllers.addCart)
routesCartMongo.delete('/:id', cartsControllers.deleteCart)
routesCartMongo.get('/:id/products', cartsControllers.productsinCart)
routesCartMongo.post('/:id/products', cartsControllers.addProductInCart)
routesCartMongo.delete('/:idcart/products/:idprod', cartsControllers.deleteProductInCart)


module.exports = { routesProductsMongo, routesCartMongo }