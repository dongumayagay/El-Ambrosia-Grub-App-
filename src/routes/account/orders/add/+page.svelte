<script lang="ts">
	import type { PageData } from './$types';
	import ContactFields from '$lib/components/ContactFields.svelte';
	import CartTable from '$lib/components/CartTable.svelte';
	import cart from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { enhance, type SubmitFunction } from '$app/forms';
	import FeesAndTotal from './FeesAndTotal.svelte';
	import OrderItems from './OrderItems.svelte';

	export let data: PageData;

	let loading: boolean;

	const { subtotal, total_quantity } = cart;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				cart.clear();
				window.location.replace(result.location);
			}
			// await update({ reset: false });
			loading = false;
		};
	};

	$: if ($cart.length === 0 && browser) goto('/account/orders', { replaceState: true });
</script>

{#if $cart}
	<form method="post" use:enhance={enhance_function}>
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
