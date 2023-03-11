import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals }) => {
    try {
        await locals.supabaseClient.rpc('delete_expired_otp_codes')
        return new Response();
    } catch (err) {
        console.error(err)
        throw error(500)
    }
};