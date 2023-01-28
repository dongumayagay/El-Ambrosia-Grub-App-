import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {
    return { product: await (await locals.supabaseClient.from('products').select('id,name').eq('id', Number(params.product_id)).limit(1).single()).data };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        const product_variant = {
            variant_of: Number(body.product_id.toString()),
            name: body.name.toString(),
            price: Number(body.price.toString())
        }


        const { data, error: err } = await locals.supabaseClient.from('product_variants').insert(product_variant).select('id').limit(1).single()
        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, `/admin/products/${params.product_id}/variants/${data.id}/supplies/add`)
    }
};