import type { Link } from "$lib/types/custom";

export let admin_links: Link[] = [
    {
        name: "manage accounts", path: "/admin/accounts"
    }, {
        name: 'manage supplies', path: "/admin/supplies"
    }, {
        name: 'manage products', path: "/admin/products"
    }, {
        name: 'manage delivery locations', path: "/admin/delivery-locations"
    }

]
export let account_links: Link[] = [
    {
        name: "contact info", path: "/account/profile/edit"
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
