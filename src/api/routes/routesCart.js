const express =  require('express')
const routesCart = express.Router()

const cartControllers = require('../controllers/cart/cartControllers')
const cartsControllers = cartControllers.getInstance()

const isAuth = require('../middleware/isAuth')

//RUTAS CARRITOS
routesCart.post('/', cartsControllers.addCart)
routesCart.delete('/:id', cartsControllers.deleteCart)
routesCart.get('/:id/products', cartsControllers.productsinCart)
routesCart.post('/:id/products', cartsControllers.addProductInCart)
routesCart.delete('/:idcart/products/:idprod', cartsControllers.deleteProductInCart)


module.exports = { routesCart }