import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';



export const actions: Actions = {
    default: async ({ locals, params }) => {

        const { error: err } = await locals.supabaseClient.from('delivery-locations').delete().eq('id', params.delivery_location_id)
        if (err)
            return fail(Number(err.code), { error: err.message })
        throw redirect(303, '/admin/delivery-locations')
    }
};