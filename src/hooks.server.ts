import '$lib/db'
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

    const { session, supabaseClient } = await getSupabase(event);

    if (event.url.pathname.startsWith('/account') && !session)
        throw error(401, 'You are not logged-in');

    if (event.url.pathname.startsWith('/admin')) {
        if (!session) throw error(401, 'You are not logged-in');

        const { data, error: supabase_error } = await supabaseClient
            .rpc('is_super_admin', {
                uid: session.user.id
            })
        if (supabase_error) {
            console.error(supabase_error)
            throw error(Number(supabase_error.code), 'Open console for more detail');
        }
        if (!data) throw error(403, 'FORBIDDEN');
    }



    return resolve(event);
};


