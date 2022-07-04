const express =  require('express')
const routesProducts = express.Router()

const productsControllers = require('../controllers/products/productsController')

const isAuth = require('../middleware/isAuth')

//RUTAS PRODUCTOS
routesProducts.get('/', productsControllers.getAllProducts)
routesProducts.get('/:id', productsControllers.getProductById)
routesProducts.post('/', isAuth, productsControllers.addProduct)
routesProducts.put('/:id', isAuth, productsControllers.updateProduct)
routesProducts.delete('/:id', isAuth, productsControllers.deleteProduct)


module.exports = { routesProducts }