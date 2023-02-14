import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {

    return {
        variant: await (await locals.supabaseClient.from("product_variants").select('*').eq("id", params.variant_id).limit(1).single()).data,
    };
}) satisfies LayoutServerLoad;