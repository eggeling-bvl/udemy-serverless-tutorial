require('dotenv').config()
const nodemailer = require("nodemailer");

const {EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD}=process.env
const transporter = nodemailer.createTransport({
    host:EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });


exports.handler = async (event,context,cb) =>{

    const method = event.httpMethod
    if(method !== 'POST'){
        return {
            statusCode:405,
            body: 'Only Post requests allowed',
        }

    }
    const {name,email,subject,message} = JSON.parse(event.body)
    if(!email || !name || !subject || !message){
        return {
            statusCode:405,
            body: 'Please provide email value',
        } 
    }
    const data = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: `${name}<${email}>`, // list of receivers
        subject: `Hello ${subject} ✔`, // Subject line
        html: `<p>Hello ${message} ✔</p>`, // html body
      }
    try {
        await transporter.sendMail({...data})
        return {
            statusCode:200,
            body: 'success',
        }
    } catch (error) {
        return {
            statusCode:400,
            body: JSON.stringify(error.response.data),
        }
    }

  
}