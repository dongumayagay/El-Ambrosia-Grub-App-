import { fail, redirect, } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, params }) => {

        const { error: err } = await locals.supabaseClient.from('supplies').delete().eq('id', Number(params.supply_id))
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