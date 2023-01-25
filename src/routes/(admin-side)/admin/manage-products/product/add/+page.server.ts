import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    add_product: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { error: err } = await locals.supabaseClient.from('products').insert({
            name: body.name as string,
            description: body.description as string,
        })

        if (err)
            return fail(400, { error: err.message })
        throw redirect(303, '/admin/manage-products')
    }
};