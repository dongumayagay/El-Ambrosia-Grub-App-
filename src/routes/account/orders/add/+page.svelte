<script lang="ts">
	import type { PageData } from './$types';
	import ContactFields from '$lib/components/ContactFields.svelte';
	import CartTable from '$lib/components/CartTable.svelte';
	import cart from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import FeesAndTotal from './FeesAndTotal.svelte';
	import OrderItems from './OrderItems.svelte';

	export let data: PageData;

	let loading: boolean;

	const { subtotal, total_quantity } = cart;

	async function place_order(event: Event) {
		// loading = true;
		// try {
		// 	const formData = new FormData(event.target as HTMLFormElement);
		// 	const body = Object.fromEntries(formData);
		// 	const delivery_location = data.delivery_locations.find(
		// 		(item) => item.id === Number(body.location_id)
		// 	);
		// 	if (
		// 		$cart.length < 1 ||
		// 		total < 1 ||
		// 		fees[1].value < 1 ||
		// 		!data.session ||
		// 		!delivery_location
		// 	) {
		// 		throw 'error';
		// 	}
		// 	const order_address = {
		// 		street_line1: body.street_line1.toString(),
		// 		street_line2: body.street_line2.toString(),
		// 		city: delivery_location.city,
		// 		state: delivery_location.state,
		// 		postal_code: delivery_location.postal_code
		// 	};
		// 	const { data: order, error } = await supabaseClient
		// 		.from('orders')
		// 		.insert({
		// 			owner_id: data.session.user.id,
		// 			fees: JSON.stringify(fees),
		// 			total,
		// 			status: Order_States['to pay'],
		// 			total_quantity: $total_quantity
		// 		})
		// 		.select('*')
		// 		.limit(1)
		// 		.single();
		// 	if (order === null || error) {
		// 		throw error;
		// 	}
		// 	const [order_items_result, order_address_result] = await Promise.all([
		// 		supabaseClient.from('order_items').insert(
		// 			$cart.map((item) => ({
		// 				order_id: order.id,
		// 				quantity: item.quantity,
		// 				variant_id: item.variant_id
		// 			}))
		// 		),
		// 		supabaseClient.from('order_address').insert({ id: order.id, ...order_address })
		// 	]);
		// 	if (order_items_result.error) {
		// 		throw order_items_result.error;
		// 	}
		// 	if (order_address_result.error) {
		// 		throw order_address_result.error;
		// 	}
		// } catch (error) {
		// 	alert('Error: something went wrong');
		// 	console.log(error);
		// }
		// loading = false;
		// return;
	}

	$: if ($cart.length === 0 && browser) goto('/bag');
</script>

{#if $cart}
	<form method="post" use:enhance>
		<br />
		<div class="prose text-center mx-auto">
			<h2>Placing Order</h2>
		</div>
		<br />
		<ContactFields {data} />
		<br />
		<div class="overflow-x-auto flex-1 ">
			<CartTable />
		</div>
		<br />
		<OrderItems />
		<FeesAndTotal {data} />
		<br />
		<button
			class="btn btn-block"
			class:loading
			disabled={loading || $subtotal < 1 || $total_quantity < 1}>Checkout</button
		>
		<br />
	</form>
{/if}
