const express =  require('express')
const routesProducts = express.Router()
const routesCart = express.Router()

const productsControllers = require('../controllers/products/productsControllerFS')
const cartsControllers = require('../controllers/cart/cartControllerFS')

const admin = require('../middleware/admin')
const adminRol = true

//RUTAS PRODUCTOS
routesProducts.get('/', productsControllers.getAllProducts)
routesProducts.get('/:id', productsControllers.getProductById)
routesProducts.post('/', admin(adminRol), productsControllers.addProduct)
routesProducts.put('/:id', admin(adminRol), productsControllers.updateProduct)
routesProducts.delete('/:id', admin(adminRol), productsControllers.deleteProduct)

//RUTAS CARRITOS
routesCart.post('/', cartsControllers.addCart)
routesCart.delete('/:id', cartsControllers.deleteCart)
routesCart.get('/:id/products', cartsControllers.productsinCart)
routesCart.post('/:id/products', cartsControllers.addProductInCart)
routesCart.delete('/:idcart/products/:idprod', cartsControllers.deleteProductInCart)


module.exports = { routesProductsFS, routesCartFS }

