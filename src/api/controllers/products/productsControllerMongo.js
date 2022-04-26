const containerProducts = require('../../daos/products/productsDaosMongo')
const newContainerProducts = new containerProducts()

class productsControllers {

    async getAllProducts(req, res) {
        try {
            const allProducts =  await newContainerProducts.getAllProducts()
            res.status(200).json(allProducts)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getProductById(req, res) {
        try {
            const productById = await newContainerProducts.getByIdProduct(req.params.id)
            if (productById != undefined) {
                return res.status(200).json(productById)
            } else {
                return res.status(404).json({ error : 'Producto no encontrado' })
            }
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = await newContainerProducts.saveProduct(req.body) 
            res.status(201).json(newProduct)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateProduct(req, res) {
        try {
            const updateP = await newContainerProducts.updateProduct(req.body, req.params.id)
            res.status(200).json(updateP)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async deleteProduct(req, res) {
        try {
            const deleteP = await newContainerProducts.deleteProduct(req.params.id)
            res.status(200).json(deleteP)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = new productsControllers