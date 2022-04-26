const express =  require('express')
const routesProducts = express.Router()

const containerProducts = require('../daos/products/productsDaosFS')
const newContainerProducts = new containerProducts()

const admin = require('../middleware/admin')
const adminRol = true

routesProducts.get('/', async (req, res) => {
    try {
        const allProducts =  await newContainerProducts.getAllProducts()
        res.status(200).json(allProducts)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.get('/:id', async (req, res) => {
    try {
        const productById = await newContainerProducts.getByIdProduct(req.params.id)
        if (productById != undefined) {
            return res.status(200).json(productById)
        } else {
            return res.status(404).json({ error : 'Producto no encontrado' }) //ver si esto va
        }
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.post('/', admin(adminRol), async (req, res) => {
    try {
        const newProduct = await newContainerProducts.saveProduct(req.body) 
        res.status(201).json(newProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.put('/:id', admin(adminRol), async (req, res) => {
    try {
        const updateProduct = await newContainerProducts.updateProduct(req.body, req.params.id)
        res.status(200).json(updateProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesProducts.delete('/:id', admin(adminRol), async (req, res) => {
    try {
        const deleteProduct = await newContainerProducts.deleteProduct(req.params.id)
        res.status(200).json(deleteProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routesProducts

