const express =  require('express')
const routesProducts = express.Router()

const containerProducts = require('../class/classProducts')
const newContainerProducts = new containerProducts()

routesProducts.get('/', async (req, res) => {
    try {
        const allProducts =  await newContainerProducts.getAllProducts()
        res.json(allProducts)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.get('/:id', async (req, res) => {
    try {
        const productById = await newContainerProducts.getByIdProduct(req.params.id)
        if (productById != undefined) {
            return res.json(productById)
        } else {
            return res.json({ error : 'Producto no encontrado' }) //ver si esto va
        }
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.post('/', async (req, res) => {
    try {
        const newProduct = await newContainerProducts.saveProduct(req.body) 
        res.json(newProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.put('/:id', async (req, res) => {
    try {
        const updateProduct = await newContainerProducts.updateProduct(req.body, req.params.id)
        res.json(updateProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.delete('/:id', async (req, res) => {
    try {
        const deleteProduct = await newContainerProducts.deleteProduct(req.params.id)
        res.json(deleteProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routesProducts

