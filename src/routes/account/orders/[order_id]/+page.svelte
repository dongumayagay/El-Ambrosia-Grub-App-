<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import PayOnDelivery from './PayOnDelivery.svelte';
	import PayOnline from './PayOnline.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action, update }) => {
			await update();
			loading = false;
		};
	};
</script>

{#if data.order && data.order_address && data.order_items}
	<main>
		<OrderDetails {data} />
		{#if data.order.status === 0}
			<div class="grid grid-cols-2 gap-4">
				<PayOnline />
				<PayOnDelivery {form} />
				<form action="?/cancel" class="contents" method="POST" use:enhance={enhance_function}>
					<button
						formaction="?/cancel"
						class="btn btn-block btn-outline col-span-full"
						disabled={loading}
						class:loading>Cancel</button
					>
				</form>
			</div>
		{/if}
	</main>
{:else}
	something is wrong
{/if}
