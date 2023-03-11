import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const x_callback_token = request.headers.get('x-callback-token')
    console.log(x_callback_token)
    const data = await request.json()
    console.log(data)
    return json(data);
};