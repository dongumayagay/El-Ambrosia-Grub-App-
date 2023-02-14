import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, params }) => {

        const { error: err } = await locals.supabaseClient.from('variant_supply').delete().eq("id", params.variant_supply_id)
        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, `/admin/products/${params.product_id}/variants/${params.variant_id}/supplies/`)
    }
};