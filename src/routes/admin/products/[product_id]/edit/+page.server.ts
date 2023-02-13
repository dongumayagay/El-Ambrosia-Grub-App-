import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const data = await request.formData()
        const body = Object.fromEntries(data)

        const product_image = body.product_image as Blob
        if (!product_image) return fail(400)

        const current_image_path = data.get('current_image_url')?.toString().split('/').pop()
        if (!current_image_path) return fail(400)




        // const product_id = Number(params.product_id)
        // locals.supabaseClient.storage.from('product-images')
        // if (product_image) {
        //     const file_extension = product_image.name.split('.')[1]

        //     const { data: product_image_upload_data, error: err } = await
        //         locals.supabaseClient.storage.from('product-images').update(`public/product-images/${product_id}.${file_extension}`, product_image)
        //     if (err)
        //         return fail(400, { error: err.message })
        //     if (product_image_upload_data.path) {
        //         const { data: { publicUrl } } = await locals.supabaseClient.storage.from('product-images').getPublicUrl(product_image_upload_data.path)
        //         const { error: err } = await locals.supabaseClient.from('products').update({
        //             name: body.name as string,
        //             description: body.description as string,
        //             image_url: publicUrl
        //         }).eq('id', product_id)
        //         if (err)
        //             return fail(400, { error: err.message })
        //     }
        //     throw redirect(303, '/admin/products')
        // }

        // const { error: err } = await locals.supabaseClient.from('products').update({
        //     name: body.name as string,
        //     description: body.description as string,
        // }).eq('id', product_id)

        // if (err)
        //     return fail(400, { error: err.message })
        // throw redirect(303, '/admin/products')
    }
};