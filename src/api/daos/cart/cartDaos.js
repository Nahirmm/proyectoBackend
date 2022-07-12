const cartModel = require ('../../models/mongo').cartMongo
const logger = require('../../utils/winston')

class cartDaoClass {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find({})
            return carts
        } catch (error) {
            logger.error("Error in getAllCars " + error)
        }
    }

    async createCart(data) {
        try{
            const saveCart = await cartModel(data).save()
            return saveCart
        }catch(error){
            logger.error("Error in createCart " + error)
        }
    }
 
    async deleteCart(idCart) { 
        try {
            const deleteCart = await cartModel.findByIdAndDelete(idCart)
            return deleteCart
        }catch (error) {
            logger.error("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const cartById = await cartModel.findById(idCart)
            return cartById
        }catch (error) {
            logger.error("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {

            const cartById = await cartModel.findById(idCart)
            cartById.products.push(product)
            const updateCart = await cartModel.findByIdAndUpdate(cartById, product)
            return updateCart

        }catch (error) {
            logger.error("Error en addProductInCart " + error)
        }
    }
   
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartById = await cartModel.findById(idCart)
            cartById.products.delete(idProduct)
            const cartUpdated = await cartModel.findByIdAndUpdate(cartById, idCart)
            return cartUpdated
        }catch (error) {
            logger.error("Error en deleteProductInCart" + error)
        }
    } 
}

module.exports = cartDaoClass