const ProductsServices = require('../services/productsServices')
const newProductsServices = new ProductsServices
const { ProductDto } = require('../dtos/products/productsDto') 
const logger = require('../utils/winston')


async function listProducts(){
    try {
        const allProducts = await newProductsServices.getAllProducts()
        return allProducts
            
    } catch(error){
        logger.error("Error en listProducts-ControllerGraphQL: " + error)
    }
}

async function listProdById (idProduct)  {
        try {
            const idP = idProduct.id
            const product = await newProductsServices.getByIdProduct(idP)
            if (product != undefined){
                return product
            }else{
                logger.warn('ListProdById: Producto no encontrado')
            }
        } catch(error){
            logger.error("Error en listProdById-ControllerGraphQL: " + error)
        }
}

async function saveProd (data)  {
    try {
        const product = await newProductsServices.saveProduct(data)
        return product
    } catch(error){
        logger.error("Error en saveProd-ControllerGraphQL: " + error)
    }
}

async function deleteProds (idProduct)  {
    try {
        const idP = idProduct.id
        const product = await newProductsServices.deleteProduct(idP)
        return product
    } catch(error){
        logger.error("Error en deleteProds-ControllerGraphQL: " + error)
    }
}

async function updateProds (args)  {
    try {
        const data = args
        const idP = args.id

        const product = await newProductsServices.updateProduct(idP, data)
        return product
    }catch(error){
        logger.error("Error en updateProds-ControllerGraphQL: " + error)
    }
}

const graphQLRoot = {
    getAll: listProducts,
    getById: listProdById,
    addProduct: saveProd,
    deleteProduct: deleteProds,
    updateProduct: updateProds,
} 

module.exports = graphQLRoot