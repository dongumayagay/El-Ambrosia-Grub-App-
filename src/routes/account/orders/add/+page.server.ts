import { Order_States } from '$lib/misc/constants';
// import { i } from '$lib/payment/xendit.server';
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
    default: async ({ request, locals, url }) => {
        if (!locals.session) throw error(401)
        let redirect_url = url.origin + '/account/orders'
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
            const fees = JSON.parse(body.fees.toString()).slice(1) as { type: string, value: number }[]
            const subtotal = order_items.reduce((total, item) =>
                total + item.quantity * item.price, 0)
            const total = subtotal + fees.reduce((accumulator, curValue) => accumulator + curValue.value, 0);

            const { data: order, error: err_order } = await locals.supabaseClient.from('orders').insert({
                owner_id: locals.session.user.id,
                total_quantity,
                total,
                status: Order_States.payment,
                fees
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
                    })
                ])

            if (order_items_result.error ||
                order_address_result.error
            ) throw order_items_result.error ||
            order_address_result.error

            const { data: profile, error: err_profile } = await locals.supabaseClient.from('profiles').select('email_address').eq('id', locals.session.user.id).limit(1).single()

            if (err_profile || profile === null) throw err_profile

            // const resp = await i.createInvoice({
            //     amount: Number(body.total),
            //     externalID: order.id.toString(),
            //     customer: {
            //         given_names: body.first_name.toString(),
            //         surname: body.last_name.toString(),
            //         email: locals.session.user.email,
            //         mobile_number: body.phone_number.toString(),
            //         addresses: [
            //             {
            //                 street_line1: body.street_line1.toString(),
            //                 street_line2: body.street_line2.toString(),
            //                 city: body.city.toString(),
            //                 state: body.state.toString(),
            //                 postal_code: body.postal_code.toString(),
            //                 country: 'Philippines',
            //             }
            //         ]
            //     },
            //     customerNotificationPreference: {
            //         'invoice_paid': [
            //             'whatsapp',
            //             'sms',
            //             'email',
            //             'viber'
            //         ]
            //     },
            //     description: 'El Ambrosia Order payment',
            //     fees,
            //     invoiceDuration: 60 * 5,
            //     items: order_items.map(
            //         item => ({
            //             name: item.name,
            //             quantity: item.quantity,
            //             price: item.price
            //         })
            //     ),
            //     payerEmail: locals.session.user.email,
            //     locale: 'en',
            //     shouldSendEmail: true,
            //     failureRedirectURL: url.origin + '/bag',
            //     successRedirectURL: url.origin + '/account/orders/' + order.id
            // })

            // // @ts-ignore
            // const { error: err_invoice_update } = await locals.supabaseClient.from('orders').update({ invoice_id: resp.id }).eq('id', order.id)
            // if (err_invoice_update) throw err_invoice_update

            // // @ts-ignore
            // invoice_url = resp.invoice_url
            redirect_url = url.origin + '/account/orders/' + order.id
        } catch (err) {
            console.log(err)
            throw error(500, JSON.stringify(err, null, 2))
        }
        throw redirect(303, redirect_url)
    }
};