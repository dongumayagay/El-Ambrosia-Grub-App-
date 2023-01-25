import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const supply = {
            name: body.name.toString(),
            unit: body.unit.toString(),
            value: Number(body.value.toString()),
            threshold: Number(body.threshold.toString())
        }
        if (Number.isNaN(supply.value) || Number.isNaN(supply.threshold))
            return fail(400, { error: "invalid input detected, please try again" })

        const { error: err } = await locals.supabaseClient.from('supplies').insert(supply)
        if (err)
            return fail(Number(err.code), { error: err.message })
        throw redirect(303, '/admin/supplies')
    }
};