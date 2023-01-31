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
        const product_image = body.product_image as Blob

        if (product_image) {
            const file_extension = product_image.name.split('.')[1]

            const { data: product_image_upload_data, error: err } = await
                locals.supabaseClient.storage.from('product-images').upload(`${product_id}.${file_extension}`, product_image)
            if (err)
                return fail(400, { error: err.message })
            if (product_image_upload_data.path) {
                const { data: { publicUrl } } = await locals.supabaseClient.storage.from('product-images').getPublicUrl(product_image_upload_data.path)
                const { error: err } = await locals.supabaseClient.from('products').update({
                    name: body.name as string,
                    description: body.description as string,
                    image_url: publicUrl
                }).eq('id', product_id)
                if (err)
                    return fail(400, { error: err.message })
            }
            throw redirect(303, '/admin/products')
        }

        const { error: err } = await locals.supabaseClient.from('products').update({
            name: body.name as string,
            description: body.description as string,
        }).eq('id', product_id)

        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, '/admin/products')
    }
};