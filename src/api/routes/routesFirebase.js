const express =  require('express')
const routesProductsFirebase = express.Router()
const routesCartFirebase = express.Router()

const productsControllers = require('../controllers/products/productsControllerFirebase')
const cartsControllers = require('../controllers/cart/cartControllersFirebase')

const admin = require('../middleware/admin')
const adminRol = true

//RUTAS PRODUCTOS
routesProductsFirebase.get('/', productsControllers.getAllProducts)
routesProductsFirebase.get('/:id', productsControllers.getProductById)
routesProductsFirebase.post('/', admin(adminRol), productsControllers.addProduct)
routesProductsFirebase.put('/:id', admin(adminRol), productsControllers.updateProduct)
routesProductsFirebase.delete('/:id', admin(adminRol), productsControllers.deleteProduct)

//RUTAS CARRITOS
routesCartFirebase.post('/', cartsControllers.addCart)
routesCartFirebase.delete('/:id', cartsControllers.deleteCart)
routesCartFirebase.get('/:id/products', cartsControllers.productsinCart)
routesCartFirebase.post('/:id/products', cartsControllers.addProductInCart)
routesCartFirebase.delete('/:idcart/products/:idprod', cartsControllers.deleteProductInCart)


module.exports = { routesProductsFirebase, routesCartFirebase }