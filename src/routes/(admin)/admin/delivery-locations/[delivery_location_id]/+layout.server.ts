import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        delivery_location: await (await locals.supabaseClient.from('delivery-locations').select('*').eq('id', params.delivery_location_id).limit(1).single()).data
    };
}) satisfies LayoutServerLoad;