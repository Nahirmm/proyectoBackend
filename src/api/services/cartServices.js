const cartDaos = require('../daos/cart/cartDaos')
const cartDao = cartDaos.getInstance()
const logger = require('../utils/winston')
const moment = require('moment')
let instance = null

class CartService {
    constructor() {
        this.cart = []
    }

    static getInstance() {
        if(!instance) {
            instance = new CartService()
        }
        return instance
    }

    async getAllCarts() {
        try {
            return await cartDao.getAllCarts()
        } catch (error) {
            logger.error("Error in getAllCars-Services: " + error)
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
            logger.error("Error in createCart-Services: " + error)
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
            logger.error("Error in deleteCart-Services: " + error)
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
            logger.error("Error in listProductsInCart-Services: " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const cartUpdated = await cartDao.addProductInCart(idCart, product)
            return cartUpdated

        }catch (error) {
            logger.error("Error en addProductInCart-Services: " + error)
        }
    }
    
    async deleteProductInCart(idCart, idProduct) {
        try{
            const cartUpdated = await cartDao.deleteProductInCart(idCart, idProduct)
            return cartUpdated
        }catch (error) {
            logger.error("Error en deleteProductInCart-Services: " + error)
        }
    } 
}

module.exports = CartService