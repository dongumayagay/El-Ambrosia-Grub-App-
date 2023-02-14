import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const product_image = body.product_image as Blob
        if (!product_image) return fail(400, { error: 'something wrong with product image' })
        const file_extension = product_image.name.split('.')[1]

        const { data: product, error: err_insert_product } = await locals.supabaseClient.from('products').insert({
            name: body.name.toString(),
            description: body.description.toString(),
        }).select('id').limit(1).single()
        if (err_insert_product || !product) {
            console.log(err_insert_product)
            return fail(400, { error: err_insert_product.message })
        }


        // upload product image
        const new_image_path = `${product.id}.${file_extension}`

        const { data: upload_data, error: err_upload } = await locals.supabaseClient.storage.from('product-images').upload(new_image_path, product_image, { upsert: true })
        if (err_upload || !upload_data) {
            console.log(err_upload)
            return fail(500, { error: err_upload.message })
        }

        // get url of the upload data
        const image_url = await locals.supabaseClient.storage.from('product-images').getPublicUrl(upload_data.path).data.publicUrl

        //update product info
        const { error: err_product_update } = await locals.supabaseClient.from('products').update({
            name: body.name.toString(),
            description: body.description.toString(),
            image_url
        }).eq('id', product.id)
        if (err_product_update) return fail(400, { error: err_product_update })

        throw redirect(303, `/admin/products/${product.id}/variants/add`)
    }
};