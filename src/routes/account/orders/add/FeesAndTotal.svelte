<script lang="ts">
	import type { PageData } from './$types';
	import { currency_formatter } from '$lib/misc/utils';
	import cart from '$lib/stores/cart';

	export let data: PageData;

	const { subtotal } = cart;

	let fees = {
		delivery: {
			type: 'Delivery fee',
			value:
				data.delivery_locations.find((items) => items.postal_code === data.address?.postal_code)
					?.fee ?? 100
		},
		donation: {
			type: 'Donation',
			value: 0
		}
	};
	$: fees_array = Object.values(fees).map((fee) => ({ type: fee.type, value: fee.value }));
	$: total =
		$subtotal + fees_array.reduce((accumulator, curValue) => accumulator + curValue.value, 0);
</script>

<ul class="flex flex-col gap-4 px-4">
	<li class="flex justify-between">
		<span>Subtotal </span>
		<span>{currency_formatter($subtotal)}</span>
	</li>
	<li class="flex justify-between">
		<span>{fees.delivery.type} </span>
		<span>{currency_formatter(fees.delivery.value)}</span>
	</li>
	<li class="flex justify-between">
		<span>{fees.donation.type} <a href="/charity" class="link link-info">more info</a></span>
		<div class="form-control">
			<label class="input-group input-group-sm">
				<span>₱</span>
				<input
					type="number"
					bind:value={fees.donation.value}
					class="input input-bordered text-center input-sm w-32"
					on:change={() => {
						if (fees.donation.value < 0 || fees.donation.value === null) fees.donation.value = 0;
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

<input type="hidden" name="fees" value={JSON.stringify(fees_array)} />
