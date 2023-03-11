<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import OrderDetails from '$lib/components/OrderDetails.svelte';
	import PayOnDelivery from './PayOnDelivery.svelte';
	import PayOnline from './PayOnline.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

{#if data.order && data.order_address && data.order_items}
	<main>
		<OrderDetails {data} />
		{#if data.order.status === 0}
			<div class="grid grid-cols-2 gap-4">
				<PayOnline />
				<PayOnDelivery {form} />
				<form action="?/cancel" class="contents">
					<button formaction="?/cancel" class="btn btn-block btn-outline col-span-full"
						>Cancel</button
					>
				</form>
			</div>
		{/if}
	</main>
{:else}
	something is wrong
{/if}
