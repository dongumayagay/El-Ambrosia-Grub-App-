import { fail, redirect, } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    const { supply_id } = params
    return {
        supply: await (await locals.supabaseClient.from('supplies').select('*').eq("id", supply_id).limit(1).single()).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        const updated_supply_info = {
            name: body.name.toString(),
            unit: body.unit.toString(),
            threshold: Number(body.threshold.toString())
        }
        if (Number.isNaN(updated_supply_info.threshold)) {
            return fail(400, {
                error: "Invalid input detected please try again"
            })
        }
        const { error: err } = await locals.supabaseClient.from('supplies').update(updated_supply_info).eq("id", Number(body.supply_id.toString()))
        if (err) {
            return fail(Number(err.code), {
                error: err.message
            })
        }
        throw redirect(303, '/admin/supplies/')
    }
};