const {createTransport} = require('nodemailer')
require('dotenv').config()

const MAIL = process.env.TEST_MAIL
const PASSW = process.env.PASS

const sendEmail = async () =>  {
    const transporter = createTransport({
        host: 'gmail',
        port: 587,
        auth: {
            user: MAIL,
            pass: PASSW
        }
    })

    const mailOptions = {
        from: 'Servidor Node.js',
        to: MAIL,
        subject: 'Mail de prueba desde Node.js',
        html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color:green">Node.js con Nodemailer</span></h1>'
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
}

module.exports = sendEmail