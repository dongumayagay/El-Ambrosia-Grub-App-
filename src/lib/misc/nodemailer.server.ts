import * as nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from "$env/static/private"
import type Mail from 'nodemailer/lib/mailer';
const transporter = nodemailer.createTransport({
    // host: 'smtp.example.com',
    // port: 587,
    // secure: false,
    // auth: {
    //     user: 'user@example.com',
    //     pass: 'password',
    // },
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

const mailOptions: Mail.Options = {

    to: 'dngumayagay@gmail.com',
    subject: 'Test email',
    text: 'This is a test email sent using Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Email sent: ${info.response}`);
    }
});