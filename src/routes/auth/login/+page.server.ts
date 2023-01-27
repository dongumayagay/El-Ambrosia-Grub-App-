import { getURL } from "$lib/utils";
import { AuthApiError, type Provider } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        console.log('login chuchu')
        const provider = url.searchParams.get('provider') as Provider
        console.log(provider)
        if (provider) {
            console.log('signining in using provider')
            const { data, error: err } = await locals.supabaseClient.auth.signInWithOAuth({ provider, options: { redirectTo: getURL() } })
            if (err) {
                console.log(err)
                return fail(err.status || 500, { error: err.message })
            }
            console.log(data)
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