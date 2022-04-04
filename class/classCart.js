const fs = require('fs').promises
const moment = require('moment')


class cartClass {
    constructor() {
        this.route = './db/cart.txt'
        this.cart = []
        this.id = 1
    }

    async getAllCart() {
        try{
            const cartList = await fs.readFile(this.route)
            if(cartList.toString() != ''){
                this.cart = JSON.parse(cartList)
                if(this.cart.length > 0){
                    this.id = parseInt(this.cart[this.cart.length -1].id) +1
                }else {
                    this.id = 1
                }
            }
            return this.cart
        }catch(error){
            if( error.code == "ENOENT"){
                 fs.writeFile(this.route,'')
                 return []
            }
            console.log("Error in getAllCart " + error)
        }
    }

    async createCart() {
        try{
            const loadedCart = await this.getAllCart()
            const newCart = {
                id: this.id, 
                timestamp: moment().format('L LTS'),
                products: []
            }
            loadedCart.push(newCart)
            await fs.writeFile(this.route, JSON.stringify(loadedCart ,null, 2))
            return newCart
        }catch(error){
            console.log("Error in createCart " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            const loadedCart = await this.getAllCart()
            const deleteI = loadedCart.findIndex((cart) => cart.id === parseInt(idCart))
            if (deleteI != -1 ){
                const deleteData = loadedCart.splice(deleteI,1)
                await fs.writeFile(this.route, JSON.stringify(loadedCart ,null, 2))
                return deleteData
            } 
        }catch (error) {
            console.log("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const loadedCart = await this.getAllCart()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            return cartById.products
        }catch (error) {
            console.log("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const loadedCart = await this.getAllCart()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            if (cartById) {
                cartById.products.push(product)
                await fs.writeFile(this.route, JSON.stringify(loadedCart ,null, 2))
                return cartById
            }else {
                throw new Error("No se encontró el carrito")
            }
        }catch (error) {
            throw new Error(error.message)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const loadedCart = await this.getAllCart()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            if(cartById){
                const cartIndex = loadedCart.findIndex((cart) => cart.id === parseInt(idCart))
                const deleteI = cartById.products.findIndex((prod) => prod.id === parseInt(idProduct))
                if (deleteI != -1 ){
                    cartById.products.splice(deleteI,1) 
                    loadedCart[cartIndex] = cartById
                    await fs.writeFile(this.route, JSON.stringify(loadedCart ,null, 2))
                    return cartById
                }
            }else {
                throw new Error("No se encontró el carrito")
            }

        }catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = cartClass
