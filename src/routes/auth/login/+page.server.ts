import { getURL } from "$lib/utils";
import { AuthApiError, type Provider } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        const provider = url.searchParams.get('provider') as Provider
        if (provider) {
            console.log('signining in using provider')
            const { data, error: err } = await locals.supabaseClient.auth.signInWithOAuth({ provider, options: { redirectTo: getURL() } })
            if (err) {
                console.log(err)
                return fail(err.status || 500, { error: err.message })
            }
            throw redirect(303, data.url)
        }

        const body = Object.fromEntries(await request.formData())
        const { data, error: err } = await locals.supabaseClient.auth.signInWithPassword({
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