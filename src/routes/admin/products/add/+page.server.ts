import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())





        const { data: product, error: err } = await locals.supabaseClient.from('products').insert({
            name: body.name as string,
            description: body.description as string,
        }).select('id').limit(1).single()

        const product_image = body.product_image as Blob

        if (err)
            return fail(400, { error: err.message })
        if (!product)
            return fail(500, { error: 'something went wrong, please try again' })

        if (product_image) {
            const file_extension = product_image.name.split('.')[1]

            const { data: product_image_upload_data, error: err } = await
                locals.supabaseClient.storage.from('product-images').upload(`${product.id.toString()}.${file_extension}`, product_image)
            if (err)
                return fail(400, { error: err.message })
            if (product_image_upload_data.path) {
                const { data: { publicUrl } } = await locals.supabaseClient.storage.from('product-image').getPublicUrl(product_image_upload_data.path)
                const { error: err } = await locals.supabaseClient.from('products').update({ image_url: publicUrl }).eq('id', product.id)
                if (err)
                    return fail(400, { error: err.message })
            }
        }

        throw redirect(303, `/admin/products/${product.id}/variants/add`)
    }
};