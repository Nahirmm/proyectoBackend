const classFirebase = require('../../class/classFirebase')
const classFirebaseProducts = new classFirebase('products')
const moment = require('moment')

class productsDaoClass {
    constructor() {
        this.products = []
    }

    async getAllProducts(){
        try{
            return await (await classFirebaseProducts.getAll()).docs.map(doc => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                name: doc.data().name,
                description: doc.data().description,
                code: doc.data().code,
                url: doc.data().url,
                price: doc.data().price,
                stock: doc.data().stock,
            }))
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
            await classFirebaseProducts.save(newProduct)
            return newProduct
                
        }catch(error){
            console.log("Error saveProducts " + error)
        }
    }

    async getByIdProduct(idProduct){
        try {
            return await classFirebaseProducts.getById(idProduct)
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
            await classFirebaseProducts.update(updateProduct, idProduct)
            return updateProduct;
        } catch(error){
            console.log("Error in updateProducts " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            await classFirebaseProducts.delete(idProduct)
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = productsDaoClass