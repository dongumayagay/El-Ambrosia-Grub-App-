import type { Link } from "./types/custom";

export let admin_links: Link[] = [
    {
        name: "manage accounts", path: "/admin/accounts"
    }, {
        name: 'manage supplies', path: "/admin/supplies"
    }, {
        name: 'manage products', path: "/admin/products"
    }
]
export let account_links: Link[] = [
    {
        name: "edit information", path: "/account/profile/edit"
    },
    {
        name: "cart", path: "/account/cart"
    },
    {
        name: "orders", path: "/account/orders"
    }
]

export enum Order_States {
    'to pay',
    'order received',
    'in progress',
    'out for delivery',
    'delivered',
    'completed',
}
