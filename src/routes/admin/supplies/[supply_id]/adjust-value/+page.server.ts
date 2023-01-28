import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    return {
        supply: await (await locals.supabaseClient.from('supplies').select('*').eq("id", params.supply_id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        console.log(body)

        const row_id = Number(body.supply_id.toString())
        const amount = Number(body.adjust_value_input.toString())

        if (Number.isNaN(row_id) || Number.isNaN(amount)) {
            return fail(400, {
                error: "Invalid input detected, please try again"
            })
        }

        const { error: err } = await locals.supabaseClient.rpc(
            "adjust_supply_value",
            {
                row_id,
                amount
            })

        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, '/admin/supplies/')

    }
};