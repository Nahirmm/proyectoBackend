const {createTransport} = require('nodemailer')
const logger = require('./winston')
require('dotenv').config()
const sendEmail = async () =>  {
    
    const MAIL = process.env.TEST_MAIL
    const PASSW = process.env.PASS

    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: MAIL,
            pass: PASSW
        }
    })

    const mailOptions = {
        from: MAIL,
        to: 'nanu-@live.com',
        subject: 'Mail de prueba desde Node.js',
        html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color:green">Node.js con Nodemailer</span></h1>'
    }

    const info = await transporter.sendMail(mailOptions)
    logger.data(JSON.stringify(info, null, ' '))
}

module.exports = sendEmail