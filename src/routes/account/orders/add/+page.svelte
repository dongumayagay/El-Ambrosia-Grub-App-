<script lang="ts">
	import type { PageData } from './$types';
	import ContactFields from '$lib/components/ContactFields.svelte';
	import CartTable from '$lib/components/CartTable.svelte';
	import cart from '$lib/stores/cart';

	export let data: PageData;

	let loading: boolean;
	let donation = 0;

	const { subtotal } = cart;

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
</script>

<form
	on:submit|preventDefault={() => {
		console.log('test');
	}}
>
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
			<span>₱ {fees[0].value}</span>
		</li>
		<li class="flex justify-between">
			<span>{fees[1].type}</span>
			<span>₱ {fees[1].value}</span>
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
			<span>₱ {total}</span>
		</li>
	</ul>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}>Checkout</button>
	<br />
</form>
