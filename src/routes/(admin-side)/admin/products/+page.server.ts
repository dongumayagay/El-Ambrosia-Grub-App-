import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({ products: await (await locals.supabaseClient.from('products').select('*')).data ?? [] })) satisfies PageServerLoad;