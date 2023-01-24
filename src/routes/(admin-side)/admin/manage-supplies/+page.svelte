<script lang="ts">
	import type { PageData } from './$types';
	import { supabaseClient } from '$lib/db/client';
	import { onMount } from 'svelte';
	export let data: PageData;
	let supplies = data.supplies;

	onMount(() => {
		const supplies_realtime_listener = supabaseClient
			.channel('custom-all-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'supplies' }, (payload) => {
				console.log('Change received!', payload);
				if (payload.eventType === 'INSERT') {
					// @ts-ignore
					supplies = [...supplies, payload.new];
				}
				if (payload.eventType === 'UPDATE') {
					// @ts-ignore
					supplies = supplies.map((supply) => {
						if (supply.id === payload.new.id) return payload.new;
						return supply;
					});
				}
				if (payload.eventType === 'DELETE') {
					// @ts-ignore
					supplies = supplies.filter((supply) => supply.id !== payload.old.id);
				}
			})
			.subscribe();
		return () => {
			supplies_realtime_listener.unsubscribe();
		};
	});
</script>

<main class="h-full">
	<a href="/admin/manage-supplies/create" class="btn">Add New supply</a>
	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>name</th>
					<th>value</th>
					<th>unit</th>
					<th>threshold</th>
					<!-- <th /> -->
				</tr>
			</thead>
			<tbody>
				{#each supplies as supply (supply.id)}
					<tr class="hover">
						<td>{supply.name}</td>
						<td>{supply.value}</td>
						<td>{supply.unit}</td>
						<td>{supply.threshold}</td>
						<!-- <td>
							<a class="btn" href={`/admin/manage-accounts/${user.id}`}>Details</a>
						</td> -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
