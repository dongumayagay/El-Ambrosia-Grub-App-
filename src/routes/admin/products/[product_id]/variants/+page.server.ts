import type { PageServerLoad } from './$types';


export const load = (async ({ locals, params }) => {
    const { product_id } = params
    return { product: await (await locals.supabaseClient.from('products').select('*').eq('id', Number(product_id)).limit(1).single()).data, variants: (await locals.supabaseClient.from('product_variants').select('*').eq('variant_of', product_id)).data ?? [] };
}) satisfies PageServerLoad;