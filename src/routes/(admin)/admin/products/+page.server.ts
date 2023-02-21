import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({ products: await (await locals.supabaseClient.from('products').select('*').order('updated_at')).data ?? [] })) satisfies PageServerLoad;