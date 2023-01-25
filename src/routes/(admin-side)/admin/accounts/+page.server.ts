import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    // const { data: { users }, error: err } = await locals.supabaseAdmin.auth.admin.listUsers()
    const { data } = await locals.supabaseClient.from("profiles").select('id,email_address,phone_number,first_name,last_name')

    return { users: data ?? [] };
}) satisfies PageServerLoad;