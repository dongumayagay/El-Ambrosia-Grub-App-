import * as nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from "$env/static/private"
import { error, json } from '@sveltejs/kit';
import type Mail from 'nodemailer/lib/mailer';
import type { RequestHandler } from './$types';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

export const POST: RequestHandler = async ({ request }) => {
    const mailOptions = await request.json() as Mail.Options

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return err
            } else {
                return info
            }
        });
    } catch (err) {
        console.log(err)
        throw error(500, JSON.stringify(err))
    }
    return json({ success: true })
};