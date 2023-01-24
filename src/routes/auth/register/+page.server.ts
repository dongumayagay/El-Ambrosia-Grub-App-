import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
export const actions: Actions = {
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const { data, error: err } = await locals.supabaseClient.auth.signUp({
            email: body.email as string,
            password: body.password as string
        })

        if (err) {
            if (err instanceof AuthApiError)
                return fail(err.status, { error: err.message })
            return fail(500, {
                error: 'Server error: Please try again later.'
            })
        }
        throw redirect(303, '/')
    }
};