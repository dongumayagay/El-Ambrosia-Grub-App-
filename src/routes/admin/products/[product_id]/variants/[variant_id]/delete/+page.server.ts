import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {

    return {
        variant: await (await locals.supabaseClient.from("product_variants").select('id,name').eq("id", params.variant_id).limit(1).single()).data,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())


        const { error: err } = await locals.supabaseClient.from('product_variants').delete().eq('id', Number(body.variant_id.toString()))
        if (err) {
            if (err.code === '23503')
                return fail(405, { error: "Not allowed: since this variant has supplies linked to it" })
            return fail(400, { error: err.message })
        }
        throw redirect(303, `/admin/products/${params.product_id}/variants`)
    }
};