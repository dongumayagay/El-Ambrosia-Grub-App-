import { i } from '$lib/payment/xendit.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    // i.createInvoice({})
    return new Response();
};