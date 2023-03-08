import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        variant_supply: await (await locals.supabaseClient.from('variant_supply').select('*,supplies(name,unit)').eq("id", params.variant_supply_id).limit(1).single()).data
    };
}) satisfies LayoutServerLoad;