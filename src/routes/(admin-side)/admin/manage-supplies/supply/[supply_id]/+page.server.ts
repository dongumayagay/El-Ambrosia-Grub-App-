import { error, fail, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    const { supply_id } = params
    const { data: supply } = await locals.supabaseClient.from('supplies').select('*').eq("id", supply_id).limit(1).single()
    if (!supply) throw error(404)
    return { supply };
}) satisfies PageServerLoad;

export const actions: Actions = {
    adjust_value: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        console.log(body)

        const row_id = Number(body.supply_id.toString())
        const amount = Number(body.adjust_value_input.toString())

        if (Number.isNaN(row_id) || Number.isNaN(amount)) {
            return fail(400, {
                error: {
                    form: "adjust_value",
                    message: "Invalid input detected, please try again"
                }
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
                error: {
                    form: "adjust_value",
                    message: err.message
                }
            })
        }
        return { success: "adjust_value" }

    },
    edit_supply_info: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const updated_supply_info = {
            name: body.name.toString(),
            unit: body.unit.toString(),
            threshold: Number(body.threshold.toString())
        }
        if (Number.isNaN(updated_supply_info.threshold)) {
            return fail(400, {
                error: {
                    form: "edit_supply_info",
                    message: "Invalid input detected please try again"
                }
            })
        }
        const { error: err } = await locals.supabaseClient.from('supplies').update(updated_supply_info).eq("id", Number(body.supply_id.toString()))
        if (err) {
            return fail(Number(err.code), {
                error: {
                    form: "edit_supply_info",
                    message: err.message
                }
            })
        }
        return { success: "edit_supply_info" }
    }
};