<script lang="ts">
	import CartTable from '$lib/components/CartTable.svelte';
	import { currency_formatter } from '$lib/misc/utils';
	import cart from '$lib/stores/cart';
	import type { PageData } from './$types';

	export let data: PageData;

	const { subtotal } = cart;
</script>

<main class="flex-1 flex flex-col p-4 gap-4">
	<header>
		<div class="prose mx-auto text-center">
			<h2>Your bag</h2>
		</div>
	</header>

	<div class="overflow-x-auto flex-1 mx-auto w-full max-w-7xl">
		<CartTable />
		{#if $subtotal > 0}
			<div class=" font-bold grid grid-cols-2 px-6 py-8 max-w-md sm:ml-auto">
				<span> Subtotal </span> <span class="text-right">{currency_formatter($subtotal)}</span>
			</div>
			<div class=" px-4 flex flex-col justify-between gap-4 sm:flex-row-reverse">
				{#if data.session}
					<a href="/account/orders/add" class="btn btn-primary sm:btn-wide"> Place order </a>
				{:else}
					<a href="/auth/login" class="btn btn-primary sm:btn-wide"> Login to place order </a>
				{/if}
				<a href="/products" class="btn sm:btn-wide">Back to products</a>
			</div>
		{/if}
	</div>
</main>
