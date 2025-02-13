import nodemailer from 'nodemailer'
import { config } from '../config/config.js';
import verifyTemplate from './mailTemplate/verify.template.js';

const transporter = nodemailer.createTransport({
    host:config.mailHost,
    port:config.mailport,
    secure: config.smtpsecure, 
    auth: {
      user: config.mailUsername,
      pass: config.mailPassword,
    },
  });


  const sendMail = async (email,verifyLink) =>{
    
    try {        
        const info = await transporter.sendMail({
            from: config.mailUsername, // sender address
            to: email, // list of receivers
            subject: "verification", // Subject line
            html: verifyTemplate(verifyLink), // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error.message);
        
    }

    
  }

  export default sendMail
