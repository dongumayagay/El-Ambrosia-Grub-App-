import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = await request.formData()
        const new_password = data.get('new_password')?.toString()
        if (!new_password) return fail(400, { error: 'please provide secure password' })
        const { error } = await locals.supabaseClient.auth.updateUser({ password: new_password })
        if (error) return fail(500, { error: JSON.stringify(error) })
        return { success: true }
    }
};