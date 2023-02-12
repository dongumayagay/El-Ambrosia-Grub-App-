<script lang="ts">
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action }) => {
			console.log(action.search);
			if (result.type === 'redirect') {
				if (action.search === '?/pay') location.assign(result.location);
				else goto(result.location);
			}
			loading = false;
		};
	};
</script>

{#if data.order && data.order_items}
	<main>
		<OrderDetails {data} />
		{#if data.order.status === 0}
			<form action="?/pay" method="post" class="gap-4 flex flex-col" use:enhance={enhance_function}>
				<button class="btn btn-block" class:loading disabled={loading}>Pay</button>
				<button formaction="?/cancel" class="btn btn-block btn-outline ">Cancel</button>
			</form>
		{/if}
	</main>
{/if}
