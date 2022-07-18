const cartModel = require ('../../models/mongo').cartMongo
const logger = require('../../utils/winston')
let instance = null

class CartDaoClass {
    constructor() {
        this.cart = []
    }

    static getInstance() {
        if(!instance) {
            instance = new CartDaoClass()
        }
        return instance
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find({})
            return carts
        } catch (error) {
            logger.error("Error in getAllCars-DAO: " + error)
        }
    }

    async createCart(data) {
        try{
            const saveCart = await cartModel(data).save()
            return saveCart
        }catch(error){
            logger.error("Error in createCart-DAO: " + error)
        }
    }
 
    async deleteCart(idCart) { 
        try {
            const deleteCart = await cartModel.findByIdAndDelete(idCart)
            return deleteCart
        }catch (error) {
            logger.error("Error in deleteCart-DAO: " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const cartById = await cartModel.findById(idCart)
            return cartById
        }catch (error) {
            logger.error("Error in listProductsInCart-DAO: " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const cartById = await cartModel.findById(idCart)
            cartById.products.push(product)
            const updateCart = await cartModel.findByIdAndUpdate(idCart, cartById)
            return updateCart

        }catch (error) {
            logger.error("Error en addProductInCart-DAO: " + error)
        }
    }
   
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartById = await cartModel.findById(idCart)
            cartById.products.splice(idProduct)
            const cartUpdated = await cartModel.findByIdAndUpdate(idCart, cartById)
            return cartUpdated
        }catch (error) {
            logger.error("Error en deleteProductInCart-DAO: " + error)
        }
    } 
}

module.exports = CartDaoClass