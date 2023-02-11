import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
    let order_query = locals.supabaseClient.from('orders').select('*').order('created_at')


    const status = url.searchParams.get('status')
    if (status) { order_query = order_query.eq('status', status) }


    return {
        orders: await (await order_query).data ?? []
    };
}) satisfies PageServerLoad;