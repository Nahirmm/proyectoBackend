const express =  require('express')
const routesProducts = express.Router()

const productsControllers = require('../controllers/products/productsControllerFS')

const admin = require('../middleware/admin')
const adminRol = true

routesProducts.get('/', productsControllers.getAllProducts)

routesProducts.get('/:id', productsControllers.getProductById)

routesProducts.post('/', admin(adminRol), productsControllers.addProduct)

routesProducts.put('/:id', admin(adminRol), productsControllers.updateProduct)

routesProducts.delete('/:id', admin(adminRol), productsControllers.deleteProduct)

module.exports = routesProducts

