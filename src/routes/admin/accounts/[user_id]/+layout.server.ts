import { supabaseAdmin } from '$lib/db/admin.server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {


    return {
        auth_user: await (await locals.supabaseAdmin.auth.admin.getUserById(params.user_id)).data.user,
        roles: await (await supabaseAdmin.from("roles").select(`*`).eq('id', params.user_id).limit(1).single()).data,
        profile: await (await supabaseAdmin.from("profiles").select(`*`).eq('id', params.user_id).limit(1).single()).data,
        address: await (await supabaseAdmin.from('user_address').select(`*`).eq('id', params.user_id).limit(1).single()).data,
    };
}) satisfies LayoutServerLoad;