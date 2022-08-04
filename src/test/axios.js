const axios = require('axios') 
const logger = require('../api/utils/winston') 

class Test {
    constructor(){}

    async getProducts(){ 
        try{
            const url = "http://localhost:8080/products/"
            const response = await axios.get(url)
            console.log(response.data, response.status)
        } catch(error){
            logger.error("Error en el test getProducts: " + error)
        }
    }

    async getProduct(id){ 
        try{
            const url = `http://localhost:8080/products/${id}`
            const response = await axios.get(url)
            console.log(response.status, response.data)
        } catch(error){
            logger.error("Error en el test getProduct: " + error)
        }
    }

    async postProduct(data){
        try {
            const url = "http://localhost:8080/products/"
            const res = await axios.post(url, data)
            console.log(res.status)
            console.log(res.data._id)
            console.log("Producto cargado correctamente")
        } catch(error){
            logger.error("Error en el test postProduct: " + error)
        }
    }

    async putProduct(id, data){
        try {
            const url = `http://localhost:8080/products/${id}`
            const res = await axios.put(url, data)
            console.log(res.status)
            console.log("Producto actualizado correctamente")
        } catch(error){
            logger.error("Error en el test putProduct: " + error)
        }
    }

    async deleteProduct(id){
        try {
            const url = `http://localhost:8080/products/${id}`
            const res = await axios.delete(url)
            console.log(res.status)
            console.log("Producto eliminado correctamente")
            
        } catch(error){
            logger.error("se Genero el siguiente error en el test deleteProduct " + error)
        }
    }

}

module.exports = Test