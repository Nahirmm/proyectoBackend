const productsDaos = require('../daos/products/productsDaos')
const prodDao = productsDaos.getInstance()
const logger = require('../utils/winston')
const moment = require('moment')
let instance = null

class ProductsServices {
    constructor() {}

    static getInstance() {
        if(!instance) {
            instance = new ProductsServices()
        }
        return instance
    }

    async getAllProducts(){
        try{
            const listProd = prodDao.getAllProducts()
            return listProd
        }catch(error){
            logger.error("Error getAllProducts " + error)
        }
    }

    async saveProduct(data){
        try{
            const newProduct = {
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            const prodAdded = await prodDao.saveProduct(newProduct) 
            return prodAdded
        }catch(error){
            logger.error("Error saveProducts " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            if (idProduct.length == 24) {
                const prod = await prodDao.getByIdProduct(idProduct)
                return prod
            } else {
                logger.warn('En getByIdProduct-productsService el ID ingresado es incorrecto')
            }
        } catch(error){
            logger.error("Error in getByIdProduct " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            if (idProduct.length == 24) {
                const updateProduct = {
                    timestamp: moment().format('L LTS'),
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    url: data.url,
                    price: data.price,
                    stock: data.stock
                }
                const updatedProduct = await prodDao.updateProduct(idProduct, updateProduct)
                return updatedProduct
            } else {
                logger.warn('En updateProduct-productsServices el ID ingresado es incorrecto')
            }
        } catch(error){
            logger.error("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            if (idProduct.length == 24) {
                await prodDao.deleteProduct(idProduct)
            } else {
                logger.warn('En deleteProduct el ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error " + error)
        }
    } 
}

module.exports = ProductsServices
