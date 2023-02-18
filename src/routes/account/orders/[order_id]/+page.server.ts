import { i } from '$lib/payment/xendit.server';
import type { InvoiceResponse } from '$lib/types/custom';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params, }) => {
    console.log('load trigger')
    return {
        order: await (await locals.supabaseClient.from('orders').select('*,order_address(*)').eq('id', params.order_id).limit(1).single()).data,
        order_items: await (await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)).data
    };
}) satisfies PageServerLoad;

export const actions: Actions = {

    pay_online: async ({ locals, params, url }) => {
        if (!locals.session) throw error(401)

        const { data: order, error: err_order } = await locals.supabaseClient.from('orders').select('*,order_address(*)').eq('id', params.order_id).limit(1).single()
        if (!order || err_order) {
            console.log(err_order)
            throw error(404, JSON.stringify(err_order, null, 2))
        }

        const { data: order_items, error: err_order_items } = await locals.supabaseClient.from('order_items').select('*,products(*),product_variants(*)').eq('order_id', params.order_id)
        if (order_items === null || err_order_items) {
            console.log(err_order_items)
            throw error(500, JSON.stringify(err_order_items))
        }


        const order_address = order.order_address
        if (!order_address || Array.isArray(order_address)) throw error(500)



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
                item => {

                    if (!item.products || Array.isArray(item.products) ||
                        !item.product_variants || Array.isArray(item.product_variants))
                        throw error(500)

                    return {
                        name: item.product_variants.name + ' ' + item.products.name,
                        quantity: item.quantity,
                        price: item.product_variants.price
                    }
                }

            ),
            payerEmail: locals.session.user.email,
            locale: 'en',
            shouldSendEmail: true,
            failureRedirectURL: `${url.origin}/account/orders/${params.order_id}`,
            successRedirectURL: `${url.origin}/account/orders/${params.order_id}`
        }) as InvoiceResponse

        const { error: err_invoice_update } = await locals.supabaseClient.from('orders').update({
            invoice_id: resp.id
        }).eq('id', params.order_id)
        if (err_invoice_update) throw error(500, err_invoice_update)

        throw redirect(303, resp.invoice_url)

    },
    pay_on_delivery: async ({ params, locals, request, url }) => {
        const body = Object.fromEntries(await request.formData())

        const order_user_id_image = body.order_user_id_image as Blob
        if (!order_user_id_image) {
            console.log('user id image')
            return fail(400, { error: 'user id image' })
        }

        const file_extension = order_user_id_image.name.split('.')[1]
        const new_image_path = `${params.order_id}.${file_extension}`
        const { data: upload_data, error: upload_error } = await locals.supabaseClient.storage.from('pay-on-delivery-ids').upload(new_image_path, order_user_id_image, { upsert: true })
        if (upload_error) {
            console.log(upload_error)
            return fail(500, { error: JSON.stringify(upload_error) })
        }

        const { data: { publicUrl } } = locals.supabaseClient.storage.from('pay-on-delivery-ids').getPublicUrl(upload_data.path)


        const { error: order_update_error } = await locals.supabaseClient.from('orders').update({ payment_type: 'on delivery', pay_on_delivery_id_url: publicUrl }).eq('id', params.order_id)
        if (order_update_error) {
            console.log(order_update_error)
            return fail(500, { error: JSON.stringify(order_update_error) })
        }


        await locals.supabaseClient.rpc('order_next_status', { order_id: Number(params.order_id) })
        console.log('done')
        throw redirect(303, url.pathname)
    },

    cancel: async ({ locals, params }) => {
        const { error: err } = await locals.supabaseClient.from('orders').delete().eq('id', params.order_id)
        if (err) {
            throw error(500, JSON.stringify(err, null, 2))
        }
        throw redirect(303, '/account/orders')
    }
};