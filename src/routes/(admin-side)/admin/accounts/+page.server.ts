import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        users: await (await locals.supabaseClient.from("profiles").select('id,email_address,phone_number,first_name,last_name')).data

    };
}) satisfies PageServerLoad;