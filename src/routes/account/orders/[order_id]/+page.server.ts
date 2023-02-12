import { i } from '$lib/payment/xendit.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {

    // let { data: order, error: err_order } = await locals.supabaseClient.from('orders').select('*,order_address(*)').eq('id', params.order_id).limit(1).single()
    // if (!order || err_order) {
    //     console.log(err_order)
    //     throw error(404, JSON.stringify(err_order, null, 2))
    // }

    // if (order.status === 0 && order.invoice_id !== null) {
    //     const resp = await i.getInvoice({ invoiceID: order.invoice_id })
    //     // @ts-ignore
    //     if (resp.status === 'PAID' || resp.status === 'SETTLED') {
    //         const { data: updated_order, error: err_update_order_status } = await locals.supabaseClient.from('orders').update({ status: 1 }).eq('id', params.order_id).select('*,order_address(*)').order('created_at').limit(1).single()
    //         order = updated_order
    //         console.log(err_update_order_status)
    //         throw error(500, JSON.stringify(err_update_order_status))
    //     }
    // }

    // const { data: order_items, error: err_order_items } = await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)
    // if (order_items === null || err_order_items) {
    //     console.log(err_order_items)
    //     throw error(500, JSON.stringify(err_order_items))
    // }

    return {
        order: await (await locals.supabaseClient.from('orders').select('*,order_address(*)').eq('id', params.order_id).limit(1).single()).data,
        order_items: await (await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {

    pay: async ({ locals, params, url }) => {
        if (!locals.session) throw error(401)

        let { data: order, error: err_order } = await locals.supabaseClient.from('orders').select('*,order_address(*)').eq('id', params.order_id).limit(1).single()
        if (!order || err_order) {
            console.log(err_order)
            throw error(404, JSON.stringify(err_order, null, 2))
        }

        const { data: order_items, error: err_order_items } = await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)
        if (order_items === null || err_order_items) {
            console.log(err_order_items)
            throw error(500, JSON.stringify(err_order_items))
        }


        const order_address = order.order_address as any
        if (order_address === null) throw error(500)



        const resp = await i.createInvoice({
            amount: order.total,
            externalID: params.order_id,
            customer: {
                given_names: order_address.first_name,
                surname: order_address.last_name,
                email: locals.session.user.email || '',
                mobile_number: order_address.phone_number,
                addresses: [
                    {
                        street_line1: order_address.street_line1,
                        street_line2: order_address.street_line2 || '',
                        city: order_address.city,
                        state: order_address.state,
                        postal_code: order_address.postal_code.toString(),
                        country: order_address.country,
                    }
                ]
            },
            customerNotificationPreference: {
                "invoice_created": [],
                "invoice_reminder": [],
                'invoice_paid': ['sms', 'email'],
                "invoice_expired": []
            },
            description: 'El Ambrosia Order payment',
            fees: JSON.parse(JSON.stringify(order.fees)),
            invoiceDuration: 60 * 5,
            items: order_items.map(
                item => ({
                    // @ts-ignore
                    name: item.product_variants.name + ' ' + item.products.name,
                    quantity: item.quantity,
                    // @ts-ignore
                    price: item.product_variants.price
                })
            ),
            payerEmail: locals.session.user.email,
            locale: 'en',
            shouldSendEmail: true,
            failureRedirectURL: `${url.origin}/account/orders/${params.order_id}`,
            successRedirectURL: `${url.origin}/account/orders/${params.order_id}`
        })

        // @ts-ignore
        const { error: err_invoice_update } = await locals.supabaseClient.from('orders').update({ invoice_id: resp.id }).eq('id', params.order_id)
        if (err_invoice_update) throw error(500, err_invoice_update)

        // @ts-ignore
        throw redirect(303, resp.invoice_url)
    },

    cancel: async ({ locals, params }) => {
        const { error: err } = await locals.supabaseClient.from('orders').delete().eq('id', params.order_id)
        if (err) {
            throw error(500, JSON.stringify(err, null, 2))
        }
        throw redirect(303, '/account/orders')
    }
};