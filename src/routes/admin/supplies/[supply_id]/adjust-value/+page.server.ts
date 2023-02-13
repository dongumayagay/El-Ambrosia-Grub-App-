import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        supply: await (await locals.supabaseClient.from('supplies').select('*').eq("id", params.supply_id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const amount = Number(await (await request.formData()).get('amount'))
        if (isNaN(amount)) return fail(400, { error: 'enter valid amount' })

        const { error: err } = await locals.supabaseClient.rpc(
            "adjust_supply_value",
            {
                row_id: Number(params.supply_id),
                amount
            })

        if (err) return fail(500, {
            error: JSON.stringify(err)
        })
        return { success: true }
    }
};