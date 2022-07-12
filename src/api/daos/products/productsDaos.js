const productsModel = require ('../../models/mongo').productsMongo
const logger = require('../../utils/winston')

class productsDaoClass {
    constructor() {
        this.products = []
    }

    async getAllProducts(){
        try{
            const list = await productsModel.find({})
            return list
        }catch(error){
            logger.error("Error getAllProducts " + error)
        }
    }

    async saveProduct(product){
        try{
            const saveProd = await productsModel(product).save()
            return saveProd
        }catch(error){
            logger.error("Error saveProducts " + error)
        }
    } 

    async getByIdProduct(idProduct){
        try {
            const getByIdProd = await productsModel.findById(idProduct)
            return getByIdProd
        } catch(error){
            logger.error("Error in getByIdProduct " + error)
        }
    }

    async updateProduct(idProduct, data){
        try {
            const updateProd = await productsModel.findByIdAndUpdate(idProduct, data)
            return updateProd
        } catch(error){
            logger.error("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const deleteProd = await productsModel.findByIdAndDelete(idProduct)
            return deleteProd
        }catch (error) {
            logger.error("Error " + error)
        }
    } 
}

module.exports = productsDaoClass