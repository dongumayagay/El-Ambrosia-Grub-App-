import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({ locals, params }) => {
    return { product: await (await locals.supabaseClient.from('products').select('*').eq('id', Number(params.product_id)).limit(1).single()).data, variants: (await locals.supabaseClient.from('product_variants').select('*').eq('variant_of', params.product_id)).data ?? [] };
}) satisfies PageServerLoad;