const accountSid = process.env.ACCOUNTSID ; 
const authToken = process.env.AUTHTOKEN; 
const client = require('twilio')(accountSid, authToken); 

const sendWhatsapp = () => {
    client.messages 
          .create({ 
            from: 'whatsapp:'+ process.env.TWILIOPHONEWSP,
            body: 'Probando mandar wsp desde Twilio', 
            to: 'whatsapp:'+ process.env.MYPHONEWSP 
           }) 
          .then(message => console.log(message.sid)) 
          .done();
}

module.exports =  sendWhatsapp

