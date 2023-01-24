import { supabaseAdmin } from '$lib/db/admin.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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

export const actions: Actions = {
    change_role: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const user_id = body.user_id as string
        const new_role = (body.new_role === 'null') ? null : body.new_role as string

        const { error: err } = await locals.supabaseClient.from('roles').update({ role: new_role }).eq('id', user_id)
        if (err) throw error(500, err.message)
        return { success: true }
    }
};