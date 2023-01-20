import '$lib/db'
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // protect requests to all routes that start with /protected-routes
    if (event.url.pathname.startsWith('/admin')) {
        const { session, supabaseClient } = await getSupabase(event);

        if (!session) throw redirect(303, '/');

        const { data, error } = await supabaseClient
            .rpc('is_super_admin', {
                uid: session.user.id
            })

        if (error) {
            console.error(error)
            throw redirect(303, '/');
        }

        if (!data) throw redirect(303, '/');
        console.log(data)

    }

    // protect POST requests to all routes that start with /protected-posts
    if (event.url.pathname.startsWith('/account')) {
        const { session, supabaseClient } = await getSupabase(event);

        if (!session) {
            throw error(303, '/');
        }
    }

    return resolve(event);
};