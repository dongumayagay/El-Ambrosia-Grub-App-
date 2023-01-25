import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { data } = await locals.supabaseClient.from('products').select('*')

    return { products: data ?? [] };
}) satisfies PageServerLoad;