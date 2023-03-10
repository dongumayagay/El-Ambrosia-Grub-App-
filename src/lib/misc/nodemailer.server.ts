import * as nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from "$env/static/private"


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});