const nodemailer = require("nodemailer");                   // -> libreria nodemailer
const logger = require('../logger/logger.js');              // -> logger
require("dotenv").config();                                 // -> Archivo ENV

const MAIL = process.env.MAIL;
const MAIL_PASS = process.env.MAIL_PASS;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: MAIL, 
      pass: MAIL_PASS, 
    },
  });

/* --------- nuevo registro --------- */

async function nuevoRegistro (msg){
    try {

        const mailOptions = {
            from: 'Servidor Node.js',
            to: MAIL,
            subject: 'nuevo registro',
            html: `
            <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;background: linear-gradient(135deg, #1CB5E0 0%, #000c79 100%);;padding: 10px;border-radius: 5px;">
                <div style="background-color: #fafafa; border-radius: 5px;padding: 10px;">
                <h1 style="color:#1CB5E0">NUEVO REGISTRO</h1>
                <p style="color: #525252;">Se registro un nuevo usuario al sistema</p>
                    <div style="padding:10px;">
                        <h3>Datos:</h3>
                        <ul style="list-style:none; line-height: 25px;">
                            <li><b>Email:</b> ${msg.username}</li>
                            <li><b>Nombre:</b> ${msg.nombre}</li>
                            <li><b>Direccion:</b> ${msg.direccion}</li>
                            <li><b>Edad:</b> ${msg.edad}</li>
                            <li><b>Telefono:</b> ${msg.telefono}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `
         }


        const info = await transporter.sendMail(mailOptions)
        logger.log('info', `Email de registro: ${info}`);
     } catch (error) {
        logger.log('error', `Email de registro:  ${error}`);
     }
}

/* ---------- nuevo pedido ---------- */

async function nuevoPedido (msg, user){
  try {

    let total = msg.reduce(function (acc, el) {
      return acc + el.precio
    }, 0);

      const mailOptions = {
          from: 'Servidor Node.js',
          to: MAIL,
          subject: `nuevo pedido de: ${user.nombre} email: ${user.username}`,
          html: `
          <div style="width:700px">
          <p>Se registro una nueva compra del usuario:</p>
          <h3>Nombre:${user.nombre}</h3>
          <h3>Email:${user.username}</h3>
          <table style="text-align: center;border-collapse: collapse;background: white;border-radius: 10px;overflow: hidden;width: 100%;margin: 0 auto;position: relative;">
            <thead style="background-color: #416dfd;border-radius: 5px;">
              <tr style="height: 60px;font-size: 18px;color: #fff;line-height: 1.2;font-weight: 400;">
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody>`+
              msg.map((el, index) => `
                <tr style="font-size: 15px;color: #808080;line-height: 1.2;font-weight: 400;">
                <td>
                  <img src=${el.foto} alt="foto" style="width: 100px;height: 100px;object-fit: cover;border-radius: 5px;"/>
                </td>
                <td>${el.nombre}</td>
                <td>$ ${el.precio}</td>
                <td>1</td>
                <td>$ ${el.precio}</td>
              </tr>`
              ).join('')
            +`</tbody>
            <tfoot style="background-color: #416dfd;border-radius: 5px;">
              <tr style="height: 60px;font-size: 18px;color: #fff;line-height: 1.2;font-weight: 400;">
                <td></td>
                <td></td>
                <td></td>
                <td>TOTAL</td>
                <td>$ ${total}</td>
              </tr>
            </tfoot>
          </table>

        </div>
          `
       }


      const info = await transporter.sendMail(mailOptions)
      logger.log('info', `Email de Nuevo Pedido: ${info}`);
   } catch (error) {
      logger.log('error', `Email de Nuevo Pedido:  ${error}`);
   }

}

module.exports = {nuevoRegistro,nuevoPedido}