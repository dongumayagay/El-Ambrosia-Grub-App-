import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => ({ supplies: await (await locals.supabaseClient.from('supplies').select('*')).data ?? [] })) satisfies PageServerLoad;