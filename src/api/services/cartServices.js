const cartDaos = require('../daos/cart/cartDaos')
const cartDao = new cartDaos()
const logger = require('../utils/winston')
const moment = require('moment')

class cartService {
    constructor() {
        this.cart = []
    }

    async getAllCarts() {
        try {
            return await cartDao.getAllCarts()
        } catch (error) {
            logger.error("Error in getAllCars " + error)
        }
    }

    async createCart() {
        try{
            const newCart = { 
                timestamp: moment().format('L LTS'),
                products: []
            }
            return await cartDao.createCart(newCart)
        }catch(error){
            logger.error("Error in createCart " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            if (idCart.length == 24) {
                await cartDao.deleteCart(idCart)
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            if (idCart.length == 24) {
                const cartById = await cartDao.listProductsInCart(idCart)
                return cartById.products
            } else {
                logger.warn('El ID ingresado es incorrecto')
            }
        }catch (error) {
            logger.error("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const cartUpdated = await cartDao.addProductInCart(product, idCart)
            return cartUpdated

        }catch (error) {
            logger.error("Error en addProductInCart " + error)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartUpdated = await cartDao.deleteProductInCart(idCart, idProduct)
            return cartUpdated
        }catch (error) {
            logger.error("Error en deleteProductInCart" + error)
        }
    } 
}

module.exports = cartService