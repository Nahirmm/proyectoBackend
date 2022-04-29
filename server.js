const app = require('./app')
// const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT;
// const urlMongo= process.env.DB


// mongoose.connect(urlMongo, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(data => console.log("Conectado a MongoDB"))


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))