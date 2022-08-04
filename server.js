const app = require('./app')
const express = require('express')
require('dotenv').config()
const cluster = express('cluster') 
const os = require('os')
const logger = require('./src/api/utils/winston')
const minimist = require('minimist')
const Test = require('./src/test/axios')
const AxiosTest = new Test

const args = minimist(process.argv.slice(2))
const PORT =  args.port || process.env.PORT || 8080
const numCPUs = os.cpus().length


// TESTS

let prodExample ={
    name: "TEST AXIOS put ",
    description: "String",
    code: "abcd",
    url: "String",
    price: 100,
    stock: 100
}

//AxiosTest.getProducts()
//AxiosTest.getProduct("62ebe05e1b047e9e1a647370")
//AxiosTest.postProduct(prodExample)
//AxiosTest.putProduct("62ebefa51b680beedc66c251", prodExample)
//AxiosTest.deleteProduct("62ebefa51b680beedc66c251")


const modoServer = args.modo || 'Fork'

if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {
        logger.info(`Master ${process.pid} id running`)
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()  
        }
        cluster.on('exit', (worker, code, signal) => {
            logger.warn(`worker ${worker.process.pid} died`)
        })
    } else {
        app
        .listen(PORT, () => logger.info(`http://localhost:${PORT}/auth/login`))
        .on('error', err => logger.error(err))
        logger.info(`Worker ${process.pid} started`)
    }
} else {
    app
    .listen(PORT, () => {
        logger.info(`http://localhost:${PORT}/auth/login`)
    })  
    .on('error', err => logger.error(err))
}
