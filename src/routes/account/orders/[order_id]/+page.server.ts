import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    return {
        order: await (await locals.supabaseClient.from('orders').select('*').eq('id', params.order_id).limit(1).single()).data,
        order_items: await (await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)).data
    };
}) satisfies PageServerLoad;