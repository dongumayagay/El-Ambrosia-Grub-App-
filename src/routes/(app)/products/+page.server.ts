import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        products: await (await locals.supabaseClient.from('products').select("*").order('name', { ascending: false })).data ?? []
    };
}) satisfies PageServerLoad;