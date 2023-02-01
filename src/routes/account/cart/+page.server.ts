import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session) throw error(401)


    return {
        cart_items: await (await locals.supabaseClient.from('cart_items').select('*,products(*),product_variants(*)').eq('owner_id', locals.session.user.id)).data
    };
}) satisfies PageServerLoad;