<script lang="ts">
	import { currency_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const fees = JSON.parse(JSON.stringify(data.order.fees));
</script>

<!-- <pre>{JSON.stringify(fees, null, 2)}</pre> -->
<ul class="flex flex-col gap-4 px-4">
	<li class="flex justify-between">
		<span>Subtotal </span>
		<span>{currency_formatter(data.order.subtotal)}</span>
	</li>
	<li class="flex justify-between">
		<span>Delivery fee </span>
		<span>{currency_formatter(fees[0].value)}</span>
	</li>
	<li class="flex justify-between">
		<span>Donation </span>
		<span>{currency_formatter(fees[1].value)}</span>
	</li>
	<li class="flex justify-between font-bold text-lg">
		<span>Total</span>
		<span>{currency_formatter(data.order.total)}</span>
	</li>
</ul>
