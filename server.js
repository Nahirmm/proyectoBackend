const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT;
const urlMongo= process.env.DB

mongoose.connect(urlMongo);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))