import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {

    return {
        supply_options: await (await locals.supabaseClient.from('supplies').select('name').limit(10)).data ?? []
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const body = Object.fromEntries(await request.formData())
        const variant_id = Number(params.variant_id)
        const amount_use = Number(body.amount_use.toString())
        if (Number.isNaN(amount_use)) return fail(400, { error: 'invalid input detected, please try again' })


        const supply_id = await (await locals.supabaseClient.from('supplies').select('id').eq('name', body.supply_name.toString()).limit(1).single()).data?.id
        if (!supply_id) return fail(404, { error: "supply you entered don't exist" })




        const variant_supply = {
            id: `variant-${params.variant_id}-supply-${supply_id}`,
            variant_id,
            supply_id,
            amount_use
        }


        const { error: err } = await locals.supabaseClient.from('variant_supply').insert(variant_supply)
        if (err)
            return fail(400, { error: err.message })

        throw redirect(303, `/admin/products/${params.product_id}/variants/${params.variant_id}/supplies`)
    }
};