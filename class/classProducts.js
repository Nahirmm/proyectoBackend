const fs = require('fs').promises
const moment = require('moment')

class productsClass {
    constructor(){
        this.route= './db/products.txt'
        this.products= []
        this.id = 0
    }

    async getAllProducts(){
        try{
            const productsList = await fs.readFile(this.route)
            if(productsList.toString() != ''){
                this.products = JSON.parse(productsList)
            }
            return this.products
        }catch(error){
            if( error.code == "ENOENT"){
                 fs.writeFile(this.route,'')
                 return []
            }
            console.log("Error " + error)
        }
    }

    async saveProduct(data){
        try{
            const loadedProduct = await this.getAllProducts()
            if (loadedProduct.length != 0) {
                
            }
            this.id++
            const newProduct = {
                id: this.id, 
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            loadedProduct.push(newProduct)
            await fs.writeFile(this.route, JSON.stringify(loadedProduct ,null, 2))
        }catch(error){
            console.log("Error " + error)
            }
        }

    async getByIdProduct(idProduct){

        try {
            const loadedProduct = await this.getAllProducts()
            return loadedProduct.find(prod => prod.id == parseInt(idProduct))
        } catch(error){
            console.log("Error " + error)
        }
    }

    async updateProduct(data, idProduct){
        try {
            const loadedProduct = await this.getAllProducts()
            const updateProduct = {
                id: idProduct, 
                timestamp: moment().format('L LTS'),
                name: data.name,
                description: data.description,
                code: data.code,
                url: data.url,
                price: data.price,
                stock: data.stock
            }
            const updateI = loadedProduct.findIndex((prod) => prod.id === parseInt(idProduct))
            loadedProduct[updateI] = updateProduct
            await fs.writeFile(this.route, JSON.stringify(loadedProduct ,null, 2))
            return updateProduct;
        } catch(error){
            console.log("Error " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const loadedProduct = await this.getAllProducts()
            const deleteI = loadedProduct.findIndex((prod) => prod.id === parseInt(idProduct))

            if (deleteI === -1 ){
                return -1
            } else{
                const deleteData = loadedProduct.splice(deleteI,1)
                await fs.writeFile(this.route, JSON.stringify(loadedProduct ,null, 2))
                return deleteData
            }
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = productsClass