const productsModel = require ('../../models/mongo').productsMongo
const classMongo = require('../../class/classMongo')
const classMongoProducts = new classMongo(productsModel) 
const moment = require('moment')

class productsDaoClass {
    constructor() {
        this.products = []
    }

    async getAllProducts(){
        try{
            return await classMongoProducts.getAll()
        }catch(error){
            console.log("Error getAllProducts " + error)
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
            console.log("Error saveProducts " + error)
        }
    }

    async getByIdProduct(idProduct){
        try {
            return await classMongoProducts.getById(idProduct)
        } catch(error){
            console.log("Error in getByIdProduct " + error)
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
            console.log("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            await classMongoProducts.delete(idProduct)
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = productsDaoClass