import { writable } from 'svelte/store';


type CartItem = {
    variant_id: number,
    quantity: number,
}


const create_cart = () => {
    const { set, subscribe, update } = writable<CartItem[]>([])

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

    function clear() {
        set([])
    }

    return {
        subscribe,
        add,
        updateItemQuantity,
        removeItem,
        clear
    }
}


export default create_cart()
