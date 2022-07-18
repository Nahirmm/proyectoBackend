const productsModel = require ('../../models/mongo').productsMongo
const logger = require('../../utils/winston')
let instance = null

class ProductsDaoClass {
    constructor() {}

    static getInstance() {
        if(!instance) {
            instance = new ProductsDaoClass()
        }
        return instance
    }

    async getAllProducts(){
        try{
            const list = await productsModel.find({})
            return list
        }catch(error){
            logger.error("Error getAllProducts-DAO: " + error)
        }
    }

    async saveProduct(product){
        try{
            const saveProd = await productsModel(product).save()
            return saveProd
        }catch(error){
            logger.error("Error saveProducts-DAO: " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            const getByIdProd = await productsModel.findById(idProduct)
            return getByIdProd
        } catch(error){
            logger.error("Error in getByIdProduct-DAO: " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            const updateProd = await productsModel.findByIdAndUpdate(idProduct, data)
            return updateProd
        } catch(error){
            logger.error("Error in updateProducts-DAO: " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const deleteProd = await productsModel.findByIdAndDelete(idProduct)
            return deleteProd
        }catch (error) {
            logger.error("Error in deleteProduct-DAO: " + error)
        }
    } 
}

module.exports = ProductsDaoClass