import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, params, request }) => {

        const { error: err } = await locals.supabaseClient.from('products').delete().eq('id', Number(params.product_id))

        if (err) {
            if (err.code === '23503')
                return fail(405, { error: "Not allowed: since there are variants rely on this product" })
            return fail(400, { error: err.message })
        }

        const data = await request.formData()
        const current_image_path = data.get('current_image_url')?.toString().split('/').pop()
        if (!current_image_path) return fail(400, { error: 'something wrong with current product image' })

        const { error: err_image_delete } = await locals.supabaseClient.storage.from('product-images').remove([current_image_path])
        if (err_image_delete) {
            console.log(err_image_delete)
            return fail(500, { error: err_image_delete.message })
        }

        throw redirect(303, '/admin/products')
    }
};