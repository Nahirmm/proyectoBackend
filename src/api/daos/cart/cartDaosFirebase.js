const classFirebase = require('../../class/classFirebase')
const classFirebaseCart = new classFirebase('cart')
const moment = require('moment')


class cartDaoClass {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            return await classFirebaseCart.getAll().docs.map(doc => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                products: doc.data().products
            }))
        } catch (error) {
            console.log("Error in getAllCarts " + error)
        }

    }

    async createCart() {
        try{
            const newCart = {
                timestamp: moment().format('L LTS'),
                products: []
            }
            await classFirebaseCart.save(newCart)
            return newCart
        }catch(error){
            console.log("Error in createCart " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            await classFirebaseCart.delete(idCart)
        }catch (error) {
            console.log("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const cartById = await classFirebaseCart.getById(idCart)
            return cartById.products
        }catch (error) {
            console.log("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {         
            const cartById = await classFirebaseCart.getById(idCart)
            cartById.products.push(product)
            console.log(cartById)
            const cartUpdated = await classFirebaseCart.update(cartById, idCart)
            return cartUpdated
        }catch (error) {
            throw new Error(error.message)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartById = await classFirebaseCart.getById(idCart)
            cartById.products.delete(idProduct)
            const cartUpdated = await classMongoCart.update(cartById, idCart)
            return cartUpdated

        }catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = cartDaoClass