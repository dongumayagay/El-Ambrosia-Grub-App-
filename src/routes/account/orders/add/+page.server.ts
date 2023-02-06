import { Order_States } from '$lib/misc/constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
    return {
        profile: await (await locals.supabaseClient.from('profiles').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        address: await (await locals.supabaseClient.from('user_address').select('*').eq('id', locals.session?.user.id).limit(1).single()).data,
        delivery_locations: await (await locals.supabaseClient.from('delivery-locations').select('*').eq('enable', true)).data ?? []
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        if (!locals.session) throw error(401)
        try {


            const data = await request.formData()
            const body = Object.fromEntries(data)
            console.log(body)
            const order_items = JSON.parse(body.order_items.toString()) as { variant_id: number, quantity: number }[]


            const { data: order, error: err_order } = await locals.supabaseClient.from('orders').insert({
                owner_id: locals.session.user.id,
                total_quantity: Number(body.total_quantity),
                total: Number(body.total),
                status: Order_States['to pay'],
                fees: JSON.parse(body.fees.toString())
            }).select('id').limit(1).single()

            if (err_order || order === null)
                throw err_order


            const [order_items_result, order_address_result] = await Promise.all([
                locals.supabaseClient.from('order_items').insert(order_items.map(item => ({ order_id: order.id, ...item }))),
                locals.supabaseClient.from('order_address').insert({
                    street_line1: body.street_line1.toString(),
                    street_line2: body.street_line2.toString(),
                    city: body.city.toString(),
                    state: body.state.toString(),
                    postal_code: Number(body.postal_code),
                })
            ])

            if (order_items_result.error ||
                order_address_result.error
            ) throw order_items_result.error ||
            order_address_result.error

        } catch (err) {
            throw error(500, JSON.stringify(err))
        }
    }
};