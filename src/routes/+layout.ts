import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getUserRole } from '$lib/db'
import { error } from '@sveltejs/kit'


export const load: LayoutLoad = async (event) => {

    const { session, supabaseClient } = await getSupabase(event)

    const role = session ? await getUserRole(supabaseClient, session.user.id) : null

    // console.log(session, role)
    if (
        (event.url.pathname.startsWith('/account') && !session)
        ||
        event.url.pathname.startsWith('/admin') && !session) {
        throw error(401, '/')
    }

    return { session, role }

}

