const twilio = require("twilio");
require("dotenv").config();                                 // -> Archivo ENV
const logger = require('../logger/logger.js');              // -> logger

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

async function enviarSMS(user) {

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Hola! ${user.nombre}, tu pedido ya ha sido recibido y esta siendo procesado.`,
      from: "+19804095461",
      to: "+543764582025",
    });

  } catch (error) {
   logger.log('error', `Enviar SMS:  ${error}`);
  }
}

async function enviarWSP() {

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: "Hola!, su pedido ha sido recibido y esta siendo procesado. Muchas gracias por confiar en Virtual Store",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5493764582025",
    });

  } catch (error) {
   logger.log('error', `Enviar WSP:  ${error}`);
  }
}

module.exports = { enviarSMS, enviarWSP };
