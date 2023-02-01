import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session) throw error(401)

    return {
        cart_items: await (await locals.supabaseClient.from('cart_items').select('*,products(*),product_variants(*)').eq('owner_id', locals.session.user.id)).data,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    remove_cart_item: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        await locals.supabaseClient.from('cart_items').delete().eq('id', Number(body.cart_item_id.toString()))
        return { success: true }
    },
    change_quantity: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const quantity = Number(body.quantity.toString())
        if (!quantity || quantity < 1 || quantity > 99) return fail(400)

        await locals.supabaseClient.from('cart_items').update({ quantity }).eq('id', Number(body.cart_item_id.toString()))
    },
    place_order: async ({ locals }) => {

        if (!locals.session) throw error(401)
        const cart_items = await (await locals.supabaseClient.from('cart_items').select('*').eq('owner_id', locals.session.user.id)).data
        if (!cart_items) throw error(400)
        console.log(cart_items)

    }

};