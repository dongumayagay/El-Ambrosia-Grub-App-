import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { data, error: err } = await locals.supabaseClient.from('products').insert({
            name: body.name as string,
            description: body.description as string,
        }).select('id').limit(1).single()

        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, `/admin/products/${data.id}/variants/add`)
    }
};