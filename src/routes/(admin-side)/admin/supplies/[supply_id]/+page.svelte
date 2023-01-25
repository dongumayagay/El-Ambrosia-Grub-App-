<script lang="ts">
	import { supabaseClient } from '$lib/db/client';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	// import AdjustSupplyValue from './AdjustSupplyValue.svelte';
	// import EditSupplyInfo from './EditSupplyInfo.svelte';

	export let data: PageData;
	// export let form: ActionData;
	$: supply = data.supply;

	onMount(() => {
		const supply_realtime_listener = supabaseClient
			.channel('supply-channel')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'supplies', filter: `id=eq.${supply.id}` },
				(payload) => {
					console.log('Change received!', payload);

					if (payload.eventType === 'UPDATE') {
						// @ts-ignore
						data.supply = payload.new;
					}
				}
			)
			.subscribe();
		return () => {
			supply_realtime_listener.unsubscribe();
		};
	});
</script>

<div class="h-full flex flex-col  p-4">
	<main class="w-full max-w-md">
		<div>
			<h1 class="text-xl">Supply</h1>
			<h1 class="text-xl">Name: {supply.name}</h1>
			<h1 class="text-xl">Current value: {supply.value} {supply.unit}</h1>
			<h1 class="text-xl">threshold value: {supply.threshold} {supply.unit}</h1>
		</div>
		<br />
		<!-- <AdjustSupplyValue {data} {form} />
		<br />
		<EditSupplyInfo {data} {form} /> -->
	</main>
</div>
