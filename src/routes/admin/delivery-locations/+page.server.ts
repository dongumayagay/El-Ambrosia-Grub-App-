import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return { delivery_locations: await (await locals.supabaseClient.from('delivery-locations').select("*")).data ?? [] };
}) satisfies PageServerLoad;