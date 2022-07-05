const twilio = require('twilio')

const sendSMS = async () =>  {
    
    const accountSid = process.env.ACCOUNTSID
    const authToken = process.env.AUTHTOKEN
    
    const client = twilio(accountSid, authToken)
    
    try {
       const message = await client.messages.create({
          body: 'Hola soy Tulio y me gusta romper las pelotas con la configuración',
          from: process.env.CELUTWILIO,
          to: process.env.MICELU
         })
         console.log(message)
    } catch (error) {
       console.log("Todo ok de momento")
    }
}

module.exports =  sendSMS
