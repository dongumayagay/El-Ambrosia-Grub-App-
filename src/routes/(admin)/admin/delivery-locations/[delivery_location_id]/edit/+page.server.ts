import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';



export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())

        const address = {
            city: body.city.toString(),
            state: body.state.toString(),
            postal_code: Number(body.postal_code.toString()),
            enable: body.enable.toString() === 'on' ? true : false
        }
        const { error: err } = await locals.supabaseClient.from('delivery-locations').update(address).eq('id', params.delivery_location_id)
        if (err)
            return fail(Number(err.code), { error: err.message })
        throw redirect(303, '/admin/delivery-locations')
    }
};