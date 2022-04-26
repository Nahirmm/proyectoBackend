const express =  require('express')
const routesCart = express.Router()

const containerCart = require('../daos/cart/cartDaosFS')
const newContainerCart = new containerCart()

const containerProducts = require('../daos/products/productsDaosFS')
const newContainerProducts = new containerProducts()

routesCart.post('/', async (req, res) => {
    try {
        const newCart = await newContainerCart.createCart() 
        res.status(200).json(newCart)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesCart.delete('/:id', async (req, res) => {
    try {
        const deleteCart = await newContainerCart.deleteCart(req.params.id)
        res.status(200).json(deleteCart)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesCart.get('/:id/products', async (req, res) => {
    try {
        const productsInCartById = await newContainerCart.listProductsInCart(req.params.id)
        res.status(200).json(productsInCartById)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesCart.post('/:id/products', async (req, res) => {
    try {
        const product = await newContainerProducts.getByIdProduct(req.body.idProduct)
        const addProduct = await newContainerCart.addProductInCart(req.params.id, product)
        res.status(201).json(addProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesCart.delete('/:idcart/products/:idprod', async (req, res) => {
    try {
        const deleteProduct = await newContainerCart.deleteProductInCart(req.params.idcart, req.params.idprod)
        res.status(200).json(deleteProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})


module.exports = routesCart