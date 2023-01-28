import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        product: await (await locals.supabaseClient.from('products').select('*').eq("id", params.product_id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const product_id = Number(body.product_id.toString())

        const { error: err } = await locals.supabaseClient.from('products').update({

            name: body.name as string,
            description: body.description as string,
        }).eq('id', product_id)

        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, '/admin/products')
    }
};