import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    return {
        supply: await (await locals.supabaseClient.from('supplies').select('*').eq("id", params.supply_id).limit(1).single()).data
    };

}) satisfies LayoutServerLoad;