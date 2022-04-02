const express =  require('express')
const routesProducts = express.Router()

const containerProducts = require('../class/classProducts')
const newContainerProducts = new containerProducts()

routesProducts.get('/', async (req, res) => {
    const allProducts =  await newContainerProducts.getAllProducts()
    res.json(allProducts)
})

routesProducts.get('/:id', async (req, res) => {
    const productById = await newContainerProducts.getByIdProduct(req.params.id)
    if (productById != undefined) {
        return res.json(productById)
    } else {
        return res.json({ error : 'Producto no encontrado' }) //ver si esto va
    }
})

routesProducts.post('/', async (req, res) => {
    const newProduct = await newContainerProducts.saveProduct(req.body) 
    res.json(newProduct)
})

routesProducts.put('/:id', async (req, res) => {
    const updateProduct = await newContainerProducts.updateProduct(req.body, req.params.id)

    res.json(updateProduct)
})

routesProducts.delete('/:id', async (req, res) => {
    const deleteProduct = await newContainerProducts.deleteProduct(req.params.id)
    res.json(deleteProduct)
})

module.exports = routesProducts