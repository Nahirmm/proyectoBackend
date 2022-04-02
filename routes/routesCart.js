const express =  require('express')
const routesCart = express.Router()

const containerCart = require('../class/classCart')
const newContainerCart = new containerCart()

const containerProducts = require('../class/classProducts')
const newContainerProducts = new containerProducts()

routesCart.post('/', async (req, res) => {
    const newCart = await newContainerCart.createCart() 
    res.json(newCart)
})

routesCart.delete('/:id', async (req, res) => {
    const deleteCart = await newContainerCart.deleteCart(req.params.id)
    res.json(deleteCart)
})

routesCart.get('/:id/products', async (req, res) => {
    const productsInCartById = await newContainerCart.listProductsInCart(req.params.id)
    res.json(productsInCartById)
})

routesCart.post('/:id/products', async (req, res) => {
    try {
        const product = await newContainerProducts.getByIdProduct(req.body.idProduct)
        const addProduct = await newContainerCart.addProductInCart(req.params.id, product)
        res.json(addProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})

routesCart.delete('/:idcart/products/:idprod', async (req, res) => {
    try {
        const deleteProduct = await newContainerCart.deleteProductInCart(req.params.idcart, req.params.idprod)
        res.json(deleteProduct)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})




module.exports = routesCart