import {Injectable} from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  async send() {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: 'christianvasquezmelo@gmail.com', // sender address
      to: 'christianvasquezmelo@gmail.com', // list of receivers
      subject: 'Do you even email, bro?', // Subject line
      text: 'Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations', // plain text body
    });

    console.log('Email sent: ', info.messageId);
  }
}
