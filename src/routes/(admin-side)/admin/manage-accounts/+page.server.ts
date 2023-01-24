import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { data: { users }, error: err } = await locals.supabaseAdmin.auth.admin.listUsers()

    return { users };
}) satisfies PageServerLoad;