const classFS = require('../../class/classFS')
const classFSProducts = new classFS('./db/products.txt')
const moment = require('moment')

class productsDaoClass {
    constructor() {
        this.products = []
    }

    async getAllProducts(){
        try{
            return await classFSProducts.getAll()
        }catch(error){
            console.log("Error getAllProducts " + error)
        }
    }

    async saveProduct(data){
        try{
            await classFSProducts.getAll()
            const newProduct = {
                id: classFSProducts.id, 
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            await classFSProducts.save(newProduct)
            return newProduct
                
        }catch(error){
            console.log("Error saveProducts " + error)
        }
    }

    async getByIdProduct(idProduct){
        try {
            return await classFSProducts.getById(idProduct)
        } catch(error){
            console.log("Error in getByIdProduct " + error)
        }
    }

    async updateProduct(data, idProduct){
        try {
            const updateProduct = {
                id: parseInt(idProduct), 
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            await classFSProducts.update(updateProduct, idProduct)
            return updateProduct;
        } catch(error){
            console.log("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            await classFSProducts.delete(idProduct)
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = productsDaoClass