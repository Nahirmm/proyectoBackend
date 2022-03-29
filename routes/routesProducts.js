const express =  require('express')
const routesProducts = express.Router()


const containerProducts = require('../class/classProducts')
const newCcontainerProducts = new containerProducts()

routesProducts.get('/', async (req, res) => {
    const allProducts =  await newCcontainerProducts.getAllProducts()
    console.log(allProducts)
    res.json(allProducts)
    })

    .get('/:id', async (req, res) => {
        const productById = await newCcontainerProducts.getByIdProduct(req.params.id)
        if (productById != undefined) {
            return res.json(productById)
        } else {
            return res.json({ error : 'Producto no encontrado' }) //ver si esto va
        }
    })

    .post('/', async (req, res) => {
        const newProduct = await newCcontainerProducts.saveProduct(req.body) 
        res.json(newProduct)
    })

    .put('/:id', async (req, res) => {
        const updateProduct = await newCcontainerProducts.updateProduct(req.params.id)
        res.json(updateProduct)
    })

    .delete('/:id', async (req, res) => {
        const deleteProduct = await newCcontainerProducts.deleteProduct(req.params.id)
        res.json(deleteProduct)
    })

    module.exports = routesProducts