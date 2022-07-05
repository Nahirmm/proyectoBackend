const twilio = require('twilio')

const sendSMS = async () =>  {
    
    const accountSid = process.env.ACCOUNTSID
    const authToken = process.env.AUTHTOKEN
    
    const client = twilio(accountSid, authToken)
    
    try {
       const message = await client.messages.create({
          body: 'Hola desde twilio!',
          from: process.env.TWILIOPHONE,
          to: process.env.MYPHONE
         })
         console.log(message)
    } catch (error) {
       console.log(error)
    }
}

module.exports =  sendSMS
