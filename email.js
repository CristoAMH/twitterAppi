const nodemailer = require('nodemailer');

let myEmail = {
    transporter : nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'cristoamh@gmail.com',
            pass: '1needyou'
        }
    }),

    mailOptions : {
        from: 'cristoamh@gmail.com',
        to: 'cristoamh@gmail.com',
        subject: 'Prueba',
        html: `
        <h1>Esto es una Prueba</h1>
        <p>Eres el puto junior>   
        `
    }

}

module.exports = myEmail;