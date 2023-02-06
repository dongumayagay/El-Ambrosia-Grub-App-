<script lang="ts">
	import type { PageData } from './$types';
	import { currency_formatter } from '$lib/misc/utils';
	import cart from '$lib/stores/cart';

	export let data: PageData;

	const { subtotal, total_quantity } = cart;
	let donation = 0;

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

<ul class="flex flex-col gap-4 px-4">
	<li class="flex justify-between">
		<span>{fees[0].type} </span>
		<span>{currency_formatter(fees[0].value)}</span>
		<input type="hidden" name="subtotal" value={$subtotal} />
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
					name="donation"
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
	<input type="hidden" name="total_quantity" value={$total_quantity} />
	<li class="flex justify-between font-bold text-lg">
		<span>Total</span>
		<span>{currency_formatter(total)}</span>
		<input type="hidden" name="total" value={total} />
	</li>
</ul>
