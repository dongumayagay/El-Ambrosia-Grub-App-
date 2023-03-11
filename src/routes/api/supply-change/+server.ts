import { transporter } from '$lib/misc/nodemailer.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    const x_callback_token = request.headers.get('x-callback-token')
    console.log(x_callback_token)
    const data = await request.json()
    // console.log(data)
    const { record } = data
    if (record.value < record.threshold) {
        const { data: emails, error: err } = await locals.supabaseClient.rpc('get_admin_emails')
        if (err) throw error(500, err.message)
        if (!emails || emails.length === 0) throw error(500, 'no emails')
        const parse_emails = emails.map(v => v.email)
        try {
            await transporter.sendMail({ to: parse_emails, subject: "Warning low supply quantity", html: `supply <b>${record.name}</b> is currently low in quantity` })
        } catch (err) {
            console.log(err)
            throw error(500, 'failed to send email notification')
        }

    }
    return json(data);

    // transporter.sendMail({to}, callback)
};