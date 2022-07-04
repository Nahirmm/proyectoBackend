const mongoose = require('mongoose') 

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    lastNames: String, 
    address: String,
    age: Number,
    email: String,
    phone: Number,
    //foto o avatar
    username: String,
    password: String
}))

module.exports = { User }

