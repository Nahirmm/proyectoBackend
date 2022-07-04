const app = require('./app')
const express = require('express')
require('dotenv').config()
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
const PORT =  args.port || process.env.PORT || 8080

const cluster = express('cluster') 
const os = require('os')

const numCPUs = os.cpus().length

const modoServer = args.modo || 'Fork'

if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} id running`)
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()  
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        app
        .listen(PORT, () => console.log(`http://localhost:${PORT}/`))
        .on('error', err => console.log(err))
        console.log(`Worker ${process.pid} started`)
    }
} else {
    app
    .listen(PORT, () => {
        console.log(`http://localhost:${PORT}/`)
    })  
    .on('error', err => console.log(err))
}
