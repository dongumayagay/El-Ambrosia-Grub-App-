import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';


type CartItem = {
    variant_id: number,
    quantity: number,
    name: string,
    image_url: string,
    price: number,
}


const create_cart = () => {
    const localStorageKey = 'cart'
    const cart = writable<CartItem[]>(init_cart())
    const subtotal = derived(cart, ($cart) =>
        $cart.reduce((total, item) =>
            total + item.quantity * item.price, 0)
    );
    const totalQuantity = derived(cart, ($cart) =>
        $cart.reduce((total, item) =>
            total + item.quantity, 0)
    )

    const { set, subscribe, update } = cart

    subscribe((items) =>
        browser && localStorage.setItem(localStorageKey, JSON.stringify(items))
    )

    function init_cart() {
        if (!browser) return []
        const cart = localStorage.getItem(localStorageKey)
        if (!cart) return []
        return JSON.parse(cart)
    }

    function add(item: CartItem) {
        update(items => {
            const existingItem = items.find(i => i.variant_id === item.variant_id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                items.push(item);
            }
            return items;
        });
    }
    function updateItemQuantity(variant_id: number, quantity: number) {
        update(items => {
            const existingItem = items.find(i => i.variant_id === variant_id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            return items;
        });
    }

    function removeItem(variant_id: number) {
        update((items) =>
            items.filter(i => i.variant_id !== variant_id)
        )
    }

    function save() {
        update(items => items)
    }

    function clear() {
        set([])
    }


    return {
        subscribe,
        add,
        updateItemQuantity,
        removeItem,
        save,
        clear,
        subtotal,
        totalQuantity
    }
}


export default create_cart()
