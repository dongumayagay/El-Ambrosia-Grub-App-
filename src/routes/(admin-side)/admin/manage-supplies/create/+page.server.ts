import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    add_new_supply: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())
        console.log(body)

        const { error: err } = await locals.supabaseClient.from('supplies').insert({
            name: body.name as string,
            unit: body.unit as string,
            value: Number(body.value.toString()),
            threshold: Number(body.threshold.toString())
        })
        if (err)
            return fail(400, { error: err?.message ?? 'Something went wrong' })
        throw redirect(303, '/admin/manage-supplies')
    }
};