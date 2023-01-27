import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {

    return {
        product: await (await locals.supabaseClient.from("products").select('*').eq("id", params.product_id).limit(1).single()).data,
        variant: await (await locals.supabaseClient.from("product_variants").select('*').eq("id", params.variant_id).limit(1).single()).data,
        supply_options: await (await locals.supabaseClient.from('supplies').select('name').limit(10)).data ?? []
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const supply_id = await (await locals.supabaseClient.from('supplies').select('id').eq('name', body.supply_name.toString()).limit(1).single()).data?.id
        if (!supply_id) return fail(404, { error: "supply you entered don't exist" })

        const variant_supply = {
            variant_id: Number(body.variant_id.toString()),
            supply_id,
            amount_use: Number(body.amount_will_use.toString())
        }

        const { error: err } = await locals.supabaseClient.from('variant_supply').insert(variant_supply)
        if (err)
            return fail(400, { error: err.message })
        // throw redirect(303, '/admin/supplies')
        return { success: true }
    }
};