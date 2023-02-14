import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';



export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())
        const updated_supply_info = {
            name: body.name.toString(),
            unit: body.unit.toString(),
            threshold: Number(body.threshold.toString())
        }
        if (Number.isNaN(updated_supply_info.threshold)) return fail(400, {
            error: "Invalid input detected please try again"
        })

        const { error: err } = await locals.supabaseClient.from('supplies').update(updated_supply_info).eq("id", Number(params.supply_id))
        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        // throw redirect(303, '/admin/supplies/')
        return { sucess: true }
    }
};