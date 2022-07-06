const twilio = require('twilio')
const logger = require('./winston')

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
         logger.data(JSON.stringify(message))
   } catch (error) {
      logger.error(error)
   }
}

module.exports =  sendSMS
