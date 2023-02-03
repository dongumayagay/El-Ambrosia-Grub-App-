import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    return {
        profile: await (await locals.supabaseClient.from('profiles').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        address: await (await locals.supabaseClient.from('user_addresses').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        delivery_locations: await (await locals.supabaseClient.from('delivery-locations').select('*').eq('enable', true)).data ?? []
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())


        const profile = {
            first_name: body.first_name.toString(),
            last_name: body.last_name.toString(),
            phone_number: body.phone_number.toString()
        }
        const { error: err } = await locals.supabaseClient.from('profiles').update(profile).eq('id', locals.session?.user.id)
        if (err)
            return fail(500, { error: err.message })

        return { success: true }
    }

};