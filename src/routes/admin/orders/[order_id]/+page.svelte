<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import { Order_States, states } from '$lib/misc/constants';

	export let data: PageData;

	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if data.order && data.order_items}
	<main>
		<OrderDetails {data} />
		{#if data.order.status !== 0 && data.order.status < states.length - 1}
			<form method="post" class="gap-4 flex flex-col" use:enhance={enhance_function}>
				<button
					class="btn btn-block"
					name="status"
					value={data.order.status + 1}
					class:loading
					disabled={loading}
				>
					Mark as {Order_States[data.order.status + 1]}
				</button>
			</form>
		{/if}
	</main>
{/if}
