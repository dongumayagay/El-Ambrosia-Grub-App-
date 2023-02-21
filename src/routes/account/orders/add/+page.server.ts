import { Order_States } from '$lib/misc/constants';
import { error, redirect } from '@sveltejs/kit';
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
        let redirect_url = '/account/orders'
        try {
            const data = await request.formData()
            const body = Object.fromEntries(data)

            const order_items = JSON.parse(body.order_items.toString()) as {
                product_id: number,
                variant_id: number,
                quantity: number,
                price: number,
                name: string
            }[]

            const total_quantity = order_items.reduce((total, item) =>
                total + item.quantity, 0)
            const fees = JSON.parse(body.fees.toString()) as { type: string, value: number }[]
            const subtotal = order_items.reduce((total, item) =>
                total + item.quantity * item.price, 0)
            const total = subtotal + fees.reduce((accumulator, curValue) => accumulator + curValue.value, 0);

            const { data: order, error: err_order } = await locals.supabaseClient.from('orders').insert({
                owner_id: locals.session.user.id,
                status: Order_States.payment,
                total_quantity,
                fees,
                subtotal,
                total,
                notes: body.notes.toString()
            }).select('id').limit(1).single()

            if (err_order || order === null)
                throw err_order


            const [order_items_result, order_address_result] = await Promise.all(
                [
                    locals.supabaseClient.from('order_items').insert(order_items.map(
                        item => ({
                            order_id: order.id,
                            product_id: item.product_id,
                            variant_id: item.variant_id,
                            quantity: item.quantity
                        }))),
                    locals.supabaseClient.from('order_address').insert({
                        id: order.id,
                        street_line1: body.street_line1.toString(),
                        street_line2: body.street_line2.toString(),
                        city: body.city.toString(),
                        state: body.state.toString(),
                        postal_code: Number(body.postal_code),
                        first_name: body.first_name.toString(),
                        last_name: body.last_name.toString(),
                        email_address: locals.session.user.email ?? '',
                        phone_number: body.phone_number.toString(),
                    })
                ])

            if (order_items_result.error ||
                order_address_result.error
            ) throw order_items_result.error ||
            order_address_result.error

            const { data: profile, error: err_profile } = await locals.supabaseClient.from('profiles').select('email_address').eq('id', locals.session.user.id).limit(1).single()

            if (err_profile || profile === null) throw err_profile


            redirect_url = '/account/orders/' + order.id
        } catch (err) {
            console.log(err)
            throw error(500, JSON.stringify(err, null, 2))
        }
        throw redirect(303, redirect_url)
    }
};