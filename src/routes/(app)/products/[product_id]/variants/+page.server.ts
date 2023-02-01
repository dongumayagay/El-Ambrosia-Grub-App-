import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({ locals, params }) => {
    return { product: await (await locals.supabaseClient.from('products').select('*').eq('id', Number(params.product_id)).limit(1).single()).data, variants: (await locals.supabaseClient.from('product_variants').select('*').eq('variant_of', params.product_id)).data ?? [] };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())

        if (!locals.session) throw error(401)
        console.log(body)

        const incomming_cart_item = {
            owner_id: locals.session.user.id,
            product_id: Number(body.product_id.toString()),
            product_variant_id: Number(body.product_variant_id.toString()),
            quantity: 1
        }
        const { data: cart_item } = await locals.supabaseClient.from('cart_items').select('*').match({
            owner_id: incomming_cart_item.owner_id,
            product_id: incomming_cart_item.product_id,
            product_variant_id: incomming_cart_item.product_variant_id
        }).limit(1).single()
        if (!cart_item) {
            const { error: err } = await locals.supabaseClient.from('cart_items').insert(incomming_cart_item)
            if (err) {
                console.log(err)
                return fail(500, { error: err.message })
            }
        } else {
            const { error: err } = await locals.supabaseClient.from('cart_items').update({
                ...incomming_cart_item,
                quantity: cart_item.quantity + incomming_cart_item.quantity
            }).eq('id', cart_item.id)
            if (err) {
                console.log(err)
                return fail(500, { error: err.message })
            }
        }
        return { success: true }
    }
};