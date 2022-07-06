const productsModel = require ('../../models/mongo').productsMongo
const classMongo = require('../../class/class')
const classMongoProducts = new classMongo(productsModel) 
const moment = require('moment')
const logger = require('../../utils/winston')

class productsDaoClass {
    constructor() {
        this.products = []
    }

    async getAllProducts(){
        try{
            return await classMongoProducts.getAll()
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
            await classMongoProducts.save(newProduct) 
            return newProduct
        }catch(error){
            logger.error("Error saveProducts " + error)
        }
    }

    async getByIdProduct(idProduct){
        try {
            return await classMongoProducts.getById(idProduct)
        } catch(error){
            logger.error("Error in getByIdProduct " + error)
        }
    }

    async updateProduct(data, idProduct){
        try {
            const updateProduct = {
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            await classMongoProducts.update(updateProduct, idProduct)
            return updateProduct;
        } catch(error){
            logger.error("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            await classMongoProducts.delete(idProduct)
        }catch (error) {
            logger.error("Error " + error)
        }
    }
}

module.exports = productsDaoClass