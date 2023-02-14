import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        const variant_supply_id = body.variant_supply_id.toString()
        const amount_use = Number(body.amount_use.toString())

        if (Number.isNaN(amount_use)) {
            return fail(400, {
                error: "Invalid input detected please try again"
            })
        }
        const { error: err } = await locals.supabaseClient.from('variant_supply').update({ amount_use }).eq("id", variant_supply_id)
        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, `/admin/products/${params.product_id}/variants/${params.variant_id}/supplies/`)
    }
};