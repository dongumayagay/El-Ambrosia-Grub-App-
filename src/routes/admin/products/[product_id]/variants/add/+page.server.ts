import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {
    const { product_id } = params
    const { data, error: err } = await locals.supabaseClient.from('products').select('*').eq('id', Number(product_id)).limit(1).single()
    if (err) throw error(Number(err.code), err.message)
    return { product: data };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const product_variant = {
            variant_of: Number(body.product_id.toString()),
            name: body.name.toString(),
            price: Number(body.price.toString())
        }


        const { error: err } = await locals.supabaseClient.from('product_variants').insert(product_variant)
        if (err)
            return fail(400, { error: err.message })
        // throw redirect(303, '/admin/supplies')
    }
};