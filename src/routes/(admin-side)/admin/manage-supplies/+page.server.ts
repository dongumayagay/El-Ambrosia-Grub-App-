import type { PageServerLoad } from './$types';

export const load = (async ({ locals, depends }) => {
    const { data } = await locals.supabaseClient.from('supplies').select('*')

    return { supplies: data ?? [] };
}) satisfies PageServerLoad;