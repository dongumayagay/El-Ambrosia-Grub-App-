import Xendit from "xendit-node";
import { XENDIT_SECRET_API_KEY } from "$env/static/private";

const x = new Xendit({
    secretKey: XENDIT_SECRET_API_KEY,
});

const { Invoice } = x;
const invoiceSpecificOptions = {};
export const i = new Invoice(invoiceSpecificOptions);
