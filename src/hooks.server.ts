import '$lib/db'
import { getUserRole, ROLES_ALLOWED_IN_ADMIN } from '$lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

    const { session, supabaseClient } = await getSupabase(event)


    event.locals.supabaseClient = supabaseClient
    event.locals.session = session
    event.locals.user_role = session ? await getUserRole(supabaseClient, session.user.id) : null


    if (
        (event.url.pathname.startsWith('/account') && !session)
        ||
        event.url.pathname.startsWith('/admin') && !session) {
        // throw redirect(303, '/auth/login')
        throw error(401, 'Please logged-in to continue')
    }
    if (
        event.url.pathname.startsWith("/admin")
        && session
        && !ROLES_ALLOWED_IN_ADMIN.includes(event.locals.user_role)
    ) throw error(403, "You don't have a privelege to continue")
    // if (event.url.pathname.startsWith('/auth') && session)
    //     throw redirect(303, '/account')
    return resolve(event);
};


