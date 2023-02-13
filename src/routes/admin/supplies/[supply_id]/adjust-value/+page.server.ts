import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

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