<script lang="ts">
	import type { PageData } from './$types';
	import ContactFields from '$lib/components/ContactFields.svelte';
	import CartTable from '$lib/components/CartTable.svelte';
	import cart from '$lib/stores/cart';
	import { currency_formatter } from '$lib/misc/utils';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { supabaseClient } from '$lib/db/client';
	import { Order_States } from '$lib/misc/constants';
	import { page } from '$app/stores';

	export let data: PageData;

	let loading: boolean;
	let donation = 0;

	const { subtotal } = cart;

	async function place_order(event: Event) {
		const formData = new FormData(event.target as HTMLFormElement);
		const body = Object.fromEntries(formData);

		const delivery_location = data.delivery_locations.find(
			(item) => item.id === Number(body.location_id)
		);

		if ($cart.length < 1 || total < 1 || fees[1].value < 1 || !data.session || !delivery_location) {
			alert('Error');
			return;
		}

		const order_address = {
			street_line1: body.street_line1.toString(),
			street_line2: body.street_line2.toString(),
			city: delivery_location.city,
			state: delivery_location.state,
			postal_code: delivery_location.postal_code
		};

		const { data: order, error } = await supabaseClient
			.from('orders')
			.insert({
				owner_id: data.session.user.id,
				fees: JSON.stringify(fees),
				total,
				status: Order_States['to pay']
			})
			.select('id')
			.limit(1)
			.single();
		if (order === null) {
			console.log(error);
			alert('somethng went wrong');
			return;
		}
		await supabaseClient.from('order_items').insert(
			$cart.map((item) => ({
				order_id: order.id,
				quantity: item.quantity,
				variant_id: item.variant_id
			}))
		);
		await supabaseClient.from('order_addreses').insert({ id: order.id, ...order_address });
	}

	$: fees = [
		{
			type: 'Subtotal',
			value: $subtotal
		},
		{
			type: 'Delivery fee',
			value:
				data.delivery_locations.find((items) => items.postal_code === data.address?.postal_code)
					?.fee ?? 100
		},
		{ type: 'Donation', value: donation }
	];

	$: total = fees.reduce((accumulator, curValue) => accumulator + curValue.value, 0);

	$: if ($cart.length === 0 && browser) goto('/bag');
</script>

{#if $cart}
	<form on:submit|preventDefault={place_order}>
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

		<ul class="flex flex-col gap-4 px-4">
			<li class="flex justify-between">
				<span>{fees[0].type} </span>
				<span>{currency_formatter(fees[0].value)}</span>
			</li>
			<li class="flex justify-between">
				<span>{fees[1].type}</span>
				<span>{currency_formatter(fees[1].value)}</span>
			</li>

			<li class="flex justify-between">
				<span>{fees[2].type} <a href="/charity" class="link link-info">more info</a></span>

				<div class="form-control">
					<label class="input-group input-group-sm">
						<span>₱</span>
						<input
							type="number"
							bind:value={donation}
							class="input input-bordered text-center input-sm w-32"
							on:change={() => {
								if (fees[2].value < 0 || fees[2].value === null) fees[2].value = 0;
							}}
							min="0"
							step="10"
						/>
					</label>
				</div>
			</li>
			<li class="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>{currency_formatter(total)}</span>
			</li>
		</ul>
		<br />
		<button class="btn btn-block" class:loading disabled={loading || total < 1}>Checkout</button>
		<br />
	</form>
{/if}
