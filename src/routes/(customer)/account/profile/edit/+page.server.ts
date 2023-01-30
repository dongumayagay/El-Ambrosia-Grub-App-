import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    return {
        profile: await (await locals.supabaseClient.from('profiles').select('*').eq('id', locals.session?.user.id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())


        const profile = {
            first_name: body.first_name.toString(),
            last_name: body.last_name.toString(),
            email_address: body.email_address.toString(),
            phone_number: body.phone_number.toString()
        }

        const result = await Promise.all([(await locals.supabaseClient.from('profiles').update(profile).eq('id', locals.session?.user.id)).error,
        (await locals.supabaseClient.auth.updateUser({
            email: profile.email_address,
            data: {
                first_name: profile.first_name,
                last_name: profile.last_name
            }
        })).error
        ])

        const [update_profile_error, update_user_error] = result
        if (update_profile_error || update_user_error) {
            return fail(500, { error: JSON.stringify(result) })
        }
        return { success: true }
    }

};