import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {

        // data parsing
        const data = await request.formData()
        const body = Object.fromEntries(data)

        const current_image_path = data.get('current_image_url')?.toString().split('/').pop()
        if (!current_image_path) return fail(400, { error: 'something wrong with current product image' })

        const product_image = body.product_image as Blob
        if (!product_image) return fail(400, { error: 'something wrong with product image' })

        const file_extension = product_image.name.split('.')[1]
        const new_image_path = `${params.product_id}.${file_extension}`

        // deleting previous image
        const { error: err_image_delete } = await locals.supabaseClient.storage.from('product-images').remove([current_image_path])
        if (err_image_delete) {
            console.log(err_image_delete)
            return fail(500, { error: err_image_delete.message })
        }

        // uploading new image
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
        }).eq('id', params.product_id)
        if (err_product_update) return fail(400, { error: err_product_update })

        throw redirect(303, '/admin/products')
    }

}
