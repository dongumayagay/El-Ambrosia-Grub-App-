import { i } from '$lib/payment/xendit.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {
    return {
        order: await (await locals.supabaseClient.from('orders').select('*').eq('id', params.order_id).limit(1).single()).data,
        order_items: await (await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ locals, params }) => {
        const order = await (await locals.supabaseClient.from('orders').select('*').eq('id', params.order_id).limit(1).single()).data
        const order_items = await (await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)).data
        if (!order) throw error(400)
        const resp = await i.createInvoice({
            amount: order.total,
            externalID: order.id.toString(),
        })

    }
};