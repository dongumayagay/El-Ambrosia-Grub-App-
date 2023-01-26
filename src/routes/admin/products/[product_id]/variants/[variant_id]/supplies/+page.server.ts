import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {

    return {
        product: await (await locals.supabaseClient.from("products").select('*').eq("id", params.product_id).limit(1).single()).data,
        variant: await (await locals.supabaseClient.from("product_variants").select('*').eq("id", params.variant_id).limit(1).single()).data,
    };
}) satisfies PageServerLoad;