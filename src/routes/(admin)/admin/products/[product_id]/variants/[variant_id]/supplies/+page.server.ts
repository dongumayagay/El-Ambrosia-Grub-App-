import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {

    return {
        variant_supplies: await (await locals.supabaseClient.from('variant_supply').select('*,supplies(name,unit)').eq('variant_id', Number(params.variant_id))).data ?? []
    };
}) satisfies PageServerLoad;