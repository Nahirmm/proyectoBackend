const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productsSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    name:  {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    url: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const cartSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    products: [{type: Schema.Types.Array, ref: 'products'}]
})

const productsMongo = mongoose.model('products', productsSchema);
const cartMongo = mongoose.model('cart', cartSchema);

module.exports = { productsMongo, cartMongo }