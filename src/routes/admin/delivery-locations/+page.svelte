<script lang="ts">
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Table from '$lib/components/Table.svelte';
	import { currency_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav>
	<a href="/admin/delivery-locations/add" class="btn btn-sm gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
		Add Delivery Location</a
	>
</nav>
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
