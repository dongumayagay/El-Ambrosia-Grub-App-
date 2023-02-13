import type { PageServerLoad } from './$types';


export const load = (async ({ locals, params }) => {
    return { variants: (await locals.supabaseClient.from('product_variants').select('*').eq('variant_of', params.product_id)).data ?? [] };
}) satisfies PageServerLoad;