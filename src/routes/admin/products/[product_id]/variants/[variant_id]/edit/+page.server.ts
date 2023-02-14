import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        const product_variant = {
            name: body.name.toString(),
            price: Number(body.price.toString())
        }


        const { error: err } = await locals.supabaseClient.from('product_variants').update(product_variant).eq('id', Number(body.variant_id.toString()))
        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, `/admin/products/${params.product_id}/variants`)
    }
};