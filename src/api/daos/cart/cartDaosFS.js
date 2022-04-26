const classFS = require('../../class/classFS')
const classFSCart = new classFS('./src/db/cart.txt')
const moment = require('moment')


class cartDaoClass {
    constructor() {
        this.cart = []
    }

    async createCart() {
        try{
            await classFSCart.getAll()
            const newCart = {
                id: classFSCart.id, 
                timestamp: moment().format('L LTS'),
                products: []
            }
            await classFSCart.save(newCart)
            return newCart
        }catch(error){
            console.log("Error in createCart " + error)
        }
    }

    async deleteCart(idCart) { 
        try {
            await classFSCart.delete(idCart)
        }catch (error) {
            console.log("Error in deleteCart " + error)
        }
    }

    async listProductsInCart(idCart) {
        try {
            const loadedCart = await classFSCart.getAll()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            return cartById.products
        }catch (error) {
            console.log("Error in listProductsInCart " + error)
        }
    }

    async addProductInCart(idCart, product) {
        try {
            const loadedCart = await classFSCart.getAll()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            if (cartById) {
                cartById.products.push(product)
                await classFSCart.update(cartById, idCart)
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
            const loadedCart = await classFSCart.getAll()
            const cartById = loadedCart.find(cart => cart.id == parseInt(idCart))
            if(cartById){
                const cartIndex = loadedCart.findIndex((cart) => cart.id === parseInt(idCart))
                const deleteI = cartById.products.findIndex((prod) => prod.id === parseInt(idProduct))
                if (deleteI != -1 ){
                    cartById.products.splice(deleteI,1) 
                    await classFSCart.update(cartById, idCart)
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

module.exports = cartDaoClass