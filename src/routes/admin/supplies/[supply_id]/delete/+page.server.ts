import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        supply: await (await locals.supabaseClient.from('supplies').select('id,name').eq("id", params.supply_id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const { error: err } = await locals.supabaseClient.from('supplies').delete().eq('id', Number(body.supply_id.toString()))
        if (err) {
            if (err.code === '23503')
                return fail(405, { error: "Not allowed: Product and it's variant rely on this supply" })
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, '/admin/supplies/')
    }
};