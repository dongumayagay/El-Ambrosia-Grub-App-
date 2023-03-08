<script lang="ts">
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import Table from '$lib/components/Table.svelte';
	import { currency_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Controls>
	<a href="/admin/delivery-locations/add" class="btn btn-sm gap-2 ml-auto">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
			/>
		</svg>
		Delivery Location</a
	>
</Controls>

<Table table_headers={['city', 'province', 'postal code', 'fee', 'status', '']}>
	{#each data.delivery_locations as delivery_location (delivery_location.id)}
		<tr class="hover">
			<td> {delivery_location.city} </td>
			<td> {delivery_location.state} </td>
			<td> {delivery_location.postal_code} </td>
			<td> {currency_formatter(delivery_location.fee)} </td>
			<td>
				<div class={`badge ${delivery_location.enable ? 'badge-success' : 'badge-error'}`}>
					{delivery_location.enable ? 'Enabled' : 'Disabled'}
				</div>
			</td>
			<td
				><ActionMenuDropdownLinks
					links={[
						{ name: 'Edit', path: `/admin/delivery-locations/${delivery_location.id}/edit` },
						{
							name: 'Remove',
							path: `/admin/delivery-locations/${delivery_location.id}/delete`
						}
					]}
				/></td
			>
		</tr>
	{:else}
		<tr>
			<td colspan="7" class="text-center font-bold">
				<div class="prose text-center mx-auto">
					<h2>No delivery locations</h2>
				</div>
			</td>
		</tr>
	{/each}
</Table>
