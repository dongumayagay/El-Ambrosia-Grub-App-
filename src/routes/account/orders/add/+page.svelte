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
	import { Order_States } from '$lib/misc/constants';

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
			loading = false;
		};
	};

	$: if ($cart.length === 0 && browser) goto('/bag', { replaceState: true });
</script>

{#if $cart}
	<form method="post" use:enhance={enhance_function}>
		<br />
		<main class="">
			<!-- <section class="flex sm:justify-center">
				<ul class="steps steps-vertical sm:steps-horizontal">
					{#each Object.keys(Order_States).filter((v) => isNaN(Number(v))) as state, index}
						<li class="step uppercase" class:step-primary={0 >= index}>{state}</li>
					{/each}
				</ul>
			</section> -->
			<h1 class="text-4xl text-center font-bold">Order confirmation</h1>
		</main>
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
			disabled={loading || $subtotal < 1 || $total_quantity < 1}>Confirm</button
		>
		<br />
	</form>
{/if}
