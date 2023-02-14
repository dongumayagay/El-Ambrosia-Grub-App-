import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {

        const amount_use = Number(await (await request.formData()).get('amount_use'))
        if (isNaN(amount_use)) return fail(400, { error: 'invalid amount' })
        console.log(amount_use)
        const { error: err } = await locals.supabaseClient.from('variant_supply').update({ amount_use: amount_use }).eq("id", params.variant_supply_id)
        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, `/admin/products/${params.product_id}/variants/${params.variant_id}/supplies/`)
    }
};