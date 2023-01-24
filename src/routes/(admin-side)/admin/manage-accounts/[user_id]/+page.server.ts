import { supabaseAdmin } from '$lib/db/admin.server';
import { supabase } from '$lib/db/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const { user_id } = params
    const { data: { user }, error: err } = await locals.supabaseAdmin.auth.admin.getUserById(user_id)
    if (err)
        throw error(Number(err.status), err.message)

    const { data: profile } = await supabaseAdmin.from("profiles").select(`*`).eq('id', user_id).limit(1).single()
    const { data: role } = await supabaseAdmin.from("roles").select(`*`).eq('id', user_id).limit(1).single()

    const user_info = {
        ...user,
        ...profile,
        role: role?.role ?? null
    }

    return { user_info };
}) satisfies PageServerLoad;