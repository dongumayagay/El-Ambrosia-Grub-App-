import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load = (async () => {
    throw error(404)
    // throw new Error('Error testing')
}) satisfies PageServerLoad;