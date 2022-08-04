const express =  require('express')
const routesProducts = express.Router()

const prodControllers = require('../controllers/products/productsController')
const productsControllers = prodControllers.getInstance()

const isAuth = require('../middleware/isAuth')

//RUTAS PRODUCTOS
routesProducts.get('/', productsControllers.getAllProducts)
routesProducts.get('/:id', productsControllers.getProductById)
routesProducts.post('/', productsControllers.addProduct)
routesProducts.put('/:id',  productsControllers.updateProduct)
routesProducts.delete('/:id',  productsControllers.deleteProduct)


module.exports = { routesProducts }