import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session) throw error(401)
    return {
        orders: await (await locals.supabaseClient.from('orders').select('*').eq('owner_id', locals.session.user.id)).data
    };
}) satisfies PageServerLoad;