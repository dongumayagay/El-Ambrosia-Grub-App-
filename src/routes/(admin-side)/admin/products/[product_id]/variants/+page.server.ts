import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const { product_id } = params
    const { data, error: err } = await locals.supabaseClient.from('products').select('*').eq('id', Number(product_id)).limit(1).single()
    if (err) throw error(Number(err.code), err.message)
    return { product: data };
}) satisfies PageServerLoad;