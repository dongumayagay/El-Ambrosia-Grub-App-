import { XENDIT_CALLBACK_VERIFICATION_VERIFICATION_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    const x_callback_token = request.headers.get('x-callback-token')
    if (!x_callback_token || x_callback_token !== XENDIT_CALLBACK_VERIFICATION_VERIFICATION_TOKEN)
        throw error(400)
    const data = await request.json()
    if (data.status === 'PAID') {
        const { error: err } = await locals.supabaseClient.rpc('order_next_status', { order_id: Number(data.external_id) })
        if (err) throw error(500, err)
        const { error: err2 } = await locals.supabaseClient.from('payments').insert({ 'order_id': Number(data.external_id), payload: data })
        if (err2) throw error(500, err2)
    }
    return new Response();
};