import '$lib/db'
import { getUserRole, ROLES_ALLOWED_IN_ADMIN } from '$lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

    const { session, supabaseClient } = await getSupabase(event)
    const role = session ? await getUserRole(supabaseClient, session.user.id) : null


    if (
        (event.url.pathname.startsWith('/account') && !session)
        ||
        event.url.pathname.startsWith('/admin') && !session) {

        throw error(401, 'You are not logged-in')
    }
    if (
        event.url.pathname.startsWith("/admin")
        && session
        && !ROLES_ALLOWED_IN_ADMIN.includes(role)
    ) throw error(403, "FORBIDDEN")
    if (event.url.pathname.startsWith('/auth') && session)
        throw redirect(303, '/account')

    return resolve(event);
};


