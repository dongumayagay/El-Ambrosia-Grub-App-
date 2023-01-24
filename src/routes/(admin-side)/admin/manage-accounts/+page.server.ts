import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    // const { data: { users }, error: err } = await locals.supabaseAdmin.auth.admin.listUsers()
    const { data } = await locals.supabaseClient.from("profiles").select('*')

    return { users: data ?? [] };
}) satisfies PageServerLoad;