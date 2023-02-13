import '$lib/db/client'
import '$lib/db/admin.server'
import { getUserRole, ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
import { getSupabase, } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db/admin.server';

export const handle: Handle = async ({ event, resolve }) => {

    const { session, supabaseClient } = await getSupabase(event)


    event.locals.supabaseClient = supabaseClient
    event.locals.session = session
    event.locals.supabaseAdmin = supabaseAdmin
    event.locals.user_role = session ? await getUserRole(supabaseClient, session.user.id) : null


    if (
        (event.url.pathname.startsWith('/account') && !session)
        ||
        event.url.pathname.startsWith('/admin') && !session) {
        throw error(401, 'Please logged-in to continue')
    }
    if (
        event.url.pathname.startsWith("/admin")
        && session
        && !ROLES_ALLOWED_IN_ADMIN.includes(event.locals.user_role)
    ) throw error(403, "You don't have a privelege to continue")
    const response = await resolve(event);
    response.headers.set('Access-Control-Allow-Origin', '*')
    return response
};


