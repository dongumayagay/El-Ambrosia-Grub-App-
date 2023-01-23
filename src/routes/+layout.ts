import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getUserRole, ROLES_ALLOWED_IN_ADMIN } from '$lib/db'
import { error, redirect } from '@sveltejs/kit'


export const load: LayoutLoad = async (event) => {

    const { session, supabaseClient } = await getSupabase(event)

    const role = session ? await getUserRole(supabaseClient, session.user.id) : null

    if (
        (event.url.pathname.startsWith('/account') && !session)
        ||
        event.url.pathname.startsWith('/admin') && !session) {
        throw redirect(303, '/auth/login')
    }
    if (
        event.url.pathname.startsWith("/admin")
        && session
        && !ROLES_ALLOWED_IN_ADMIN.includes(role)
    ) throw error(403, "FORBIDDEN")
    if (event.url.pathname.startsWith('/auth') && session)
        throw redirect(303, '/account')

    return { session, role }

}

