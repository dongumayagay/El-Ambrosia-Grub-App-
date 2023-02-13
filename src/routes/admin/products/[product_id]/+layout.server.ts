import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        product: await (await locals.supabaseClient.from('products').select('*').eq("id", params.product_id).limit(1).single()).data
    };
}) satisfies LayoutServerLoad;