<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import OrderDetails from '$lib/components/OrderDetails.svelte';

	export let data: PageData;
</script>

{#if data.order && data.order_items}
	<main>
		<OrderDetails {data} />
		{#if data.order.status === 0}
			<form action="?/pay" method="post" class="gap-4 flex flex-col" use:enhance>
				<button class="btn btn-block">Pay</button>
				<button formaction="?/cancel" class="btn btn-block btn-outline">Cancel</button>
			</form>
		{/if}
	</main>
{/if}
