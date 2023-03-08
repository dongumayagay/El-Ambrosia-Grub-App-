import '$lib/db/client'
import '$lib/db/admin.server'
import { getUserRole, ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
import { getSupabase, } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db/admin.server';
import * as SentryNode from "@sentry/node"
import crypto from "crypto"

SentryNode.init({
    dsn: 'https://a7825f84f03b4c3799bc969ec6db9133@o4504801773486080.ingest.sentry.io/4504801802977280'
})

export const handle: Handle = async ({ event, resolve }) => {

    const { session, supabaseClient } = await getSupabase(event)


    event.locals.supabaseClient = supabaseClient
    event.locals.session = session
    event.locals.supabaseAdmin = supabaseAdmin
    event.locals.user_role = session ? await getUserRole(supabaseClient, session.user.id) : null

    if (event.url.pathname.startsWith('/account') && !session) {
        throw redirect(303, '/login')
    }
    if (event.url.pathname.startsWith('/admin') && !session) {
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




export const handleError: HandleServerError = ({ error, event }) => {

    const error_id = crypto.randomUUID()
    SentryNode.captureException(error, {
        contexts: { sveltekit: { event, error_id } }
    })
    return {
        message: "An unexpected error occured. We're working on it!",
        error_id
    }
}