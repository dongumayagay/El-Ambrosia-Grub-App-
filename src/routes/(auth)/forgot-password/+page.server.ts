import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {

    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {

    default: async ({ request, locals, url }) => {
        const data = await request.formData()
        const email = data.get('email')?.toString()
        if (!email) return fail(400, { error: 'please provide email' })
        const { error } = await locals.supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: `${url.origin}` })
        if (error) return fail(500, { error: error.message })
        return { success: true }
    }
};