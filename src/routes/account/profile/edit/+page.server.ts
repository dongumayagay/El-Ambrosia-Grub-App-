import { error, fail, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {

    return {
        profile: await (await locals.supabaseClient.from('profiles').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        address: await (await locals.supabaseClient.from('user_address').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        delivery_locations: await (await locals.supabaseClient.from('delivery-locations').select('*').eq('enable', true)).data ?? []
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        if (!locals.session) throw error(401)
        try {
            console.log(body)
            const { error: err_profile } = await locals.supabaseClient.from('profiles').upsert({
                id: locals.session.user.id,
                first_name: body.first_name.toString(),
                last_name: body.last_name.toString(),
                phone_number: body.phone_number.toString(),
            })
            if (err_profile) throw err_profile


            const { error: err_user_address } = await locals.supabaseClient.from('user_address').upsert({
                id: locals.session.user.id,
                street_line1: body.street_line1.toString(),
                street_line2: body.street_line2.toString(),
                city: body.city.toString(),
                state: body.state.toString(),
                postal_code: Number(body.postal_code.toString())
            })

            if (err_user_address) throw err_user_address

        } catch (error) {
            return fail(500, { error: JSON.stringify(error) })
        }


        return { success: true }
    }

};