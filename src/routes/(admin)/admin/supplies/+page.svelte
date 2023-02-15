<script lang="ts">
	import type { PageData } from './$types';
	import { supabaseClient } from '$lib/db/client';
	import { onMount } from 'svelte';
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Table from '$lib/components/Table.svelte';
	import Controls from '$lib/components/Controls.svelte';

	export let data: PageData;
	let supplies = data.supplies;

	onMount(() => {
		const supplies_realtime_listener = supabaseClient
			.channel('supplies-channel')
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

<Controls>
	<a href="/admin/supplies/add" class="btn btn-sm gap-2 ml-auto ">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
			/>
		</svg>
		Supply
	</a>
</Controls>

<Table table_headers={['name', 'value', '']}>
	{#each supplies as supply (supply.id)}
		<tr class="hover">
			<td>{supply.name}</td>
			<td>
				<div>
					{supply.value}
					{supply.unit}
				</div>
				{#if supply.value <= supply.threshold}
					<p class="text-warning">supply is running low</p>
				{/if}
			</td>
			<td>
				<ActionMenuDropdownLinks
					links={[
						{
							name: 'View',
							path: `/admin/supplies/${supply.id}`
						},
						{
							name: 'Adjust Value',
							path: `/admin/supplies/${supply.id}/adjust-value`
						},
						{
							name: 'Update Info',
							path: `/admin/supplies/${supply.id}/edit`
						},
						{
							name: 'Delete',
							path: `/admin/supplies/${supply.id}/delete`
						}
					]}
				/>
			</td>
		</tr>
	{:else}
		<tr>
			<td colspan="3" class="text-center font-bold">
				<div class="prose text-center mx-auto">
					<h2>No supplies</h2>
				</div>
			</td>
		</tr>
	{/each}
</Table>
