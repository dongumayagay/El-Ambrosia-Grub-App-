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