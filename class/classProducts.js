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
                console.log(this.products)
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
            const loadedProduct = await this.getAllProducts()
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
            const updateI = getAllProducts().findIndex((prod) => prod.id == idProduct)
            this.products[updateI] = updateProduct
            await fs.writeFile(this.route, JSON.stringify(this.products ,null, 2))
            return updateProduct;
        } catch(error){
            console.log("Error " + error)
        }
    }
    
    async deleteProduct(idProduct){
        try {
            const deleteI = getAllProducts().findIndex((prod) => prod.id === idProduct)

            if (deleteI === -1 ){
                return -1
            } else{
                const deleteData = this.products.splice(deleteI,1)
                await fs.writeFile(this.route, JSON.stringify(deleteData ,null, 2))
                return deleteData
            }
        }catch (error) {
            console.log("Error " + error)
        }
    }
}

module.exports = productsClass