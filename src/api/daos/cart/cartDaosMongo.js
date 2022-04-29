const cartModel = require ('../../models/mongo').cartMongo
const classMongo = require('../../class/classMongo')
const classMongoCart = new classMongo(cartModel) 
const moment = require('moment')

class cartDaoClass {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            return await classMongoCart.getAll()
        } catch (error) {
            console.log("Error in getAllCars " + error)
        }
    }

    async createCart() {
        try{
            const newCart = { 
                timestamp: moment().format('L LTS'),
                products: []
            }
            return await classMongoCart.save(newCart)
        }catch(error){
            console.log("Error in createCart " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            await classMongoCart.delete(idCart)
        }catch (error) {
            console.log("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const cartById = await classMongoCart.getById(idCart)
            return cartById.products
        }catch (error) {
            console.log("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const cartById = await classMongoCart.getById(idCart)
            cartById.products.push(product)
            const cartUpdated = await classMongoCart.update(cartById, idCart)
            return cartUpdated

        }catch (error) {
            throw new Error(error.message)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartById = await classMongoCart.getById(idCart)
            cartById.products.delete(idProduct)
            const cartUpdated = await classMongoCart.update(cartById, idCart)
            return cartUpdated
        }catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = cartDaoClass