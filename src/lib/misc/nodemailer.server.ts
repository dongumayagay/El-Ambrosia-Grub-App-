import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'user@example.com',
        pass: 'password',
    },
});

const mailOptions = {
    from: 'sender@example.com',
    to: 'recipient@example.com',
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
