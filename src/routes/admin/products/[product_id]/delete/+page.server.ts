import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const product_id = Number(body.product_id.toString())

        const { error: err } = await locals.supabaseClient.from('products').delete().eq('id', product_id)

        if (err) {
            if (err.code === '23503')
                return fail(405, { error: "Not allowed: since there are variants rely on this product" })
            return fail(400, { error: err.message })
        }
        throw redirect(303, '/admin/products')
    }
};