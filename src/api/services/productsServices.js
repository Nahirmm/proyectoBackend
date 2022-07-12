const productsDaos = require('../daos/products/productsDaos')
const prodDao = new productsDaos()
const logger = require('../utils/winston')
const moment = require('moment')

class productsServices {
    constructor() {}

    async getAllProducts(){
        try{
            const listProd = prodDao.getAllProducts()
            return listProd
        }catch(error){
            logger.error("Error getAllProducts " + error)
        }
    }

    async saveProduct(product){
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
            await prodDao.saveProduct(newProduct) 
            return newProduct
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
                logger.warn('El ID ingresado es incorrecto')
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
                await prodDao.updateProduct(idProduct, updateProduct)
                return updateProduct
            } else {
                logger.warn('El ID ingresado es incorrecto')
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
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error " + error)
        }
    } 
}

module.exports = productsServices
