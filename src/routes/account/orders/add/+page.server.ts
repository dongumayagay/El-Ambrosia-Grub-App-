import { error, fail, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    return {
        profile: await (await locals.supabaseClient.from('profiles').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        address: await (await locals.supabaseClient.from('user_addresses').select('*').eq('owner_id', locals.session?.user.id).limit(1).single()).data,
        delivery_locations: await (await locals.supabaseClient.from('delivery-locations').select('*').eq('enable', true)).data ?? []
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        if (!locals.session) throw error(401)
        try {
            const { error: err1 } = await locals.supabaseClient.from('profiles').upsert({
                id: locals.session.user.id,
                first_name: body.first_name.toString(),
                last_name: body.last_name.toString(),
                phone_number: body.phone_number.toString(),
            })
            if (err1) throw err1

            const { data: location, error: err2 } = await locals.supabaseClient.from('delivery-locations').select('*').eq('id', Number(body.location_id)).limit(1).single()

            if (err2) throw err2
            if (!location) throw '404'

            const { error: err3 } = await locals.supabaseClient.from('user_addresses').upsert({
                owner_id: locals.session.user.id,
                street_line1: body.street_line1.toString(),
                street_line2: body.street_line2.toString(),
                city: location.city,
                state: location.state,
                postal_code: location.postal_code
            }).eq('owner_id', locals.session.user.id)

            if (err3) throw err3

        } catch (error) {
            return fail(500, { error: JSON.stringify(error) })
        }


        return { success: true }
    }

};