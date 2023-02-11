<script lang="ts">
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import NotFound from '$lib/components/NotFound.svelte';
	import PaginationControl from '$lib/components/PaginationControl.svelte';
	import Table from '$lib/components/Table.svelte';
	import { display_property } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const { product, variant, variant_supplies } = data;
</script>

{#if product && variant}
	<div class="prose">
		<h2>{product.name} {variant.name} supplies will consume</h2>
	</div>
	<nav class="p-2">
		<a
			href={`/admin/products/${product.id}/variants/${variant.id}/supplies/add`}
			class="btn btn-sm gap-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
			Add supplies will consume</a
		>
	</nav>
	<Table table_headers={['name', 'amount use', 'actions']}>
		{#each variant_supplies as variant_supply (variant_supply.id)}
			<tr class="hover">
				<td>{display_property(variant_supply.supplies, 'name')}</td>
				<td>
					{variant_supply.amount_use}
					{display_property(variant_supply.supplies, 'unit')}
				</td>
				<td>
					<ActionMenuDropdownLinks
						links={[
							{
								name: 'Update Info',
								path: `/admin/products/${product.id}/variants/${variant.id}/supplies/${variant_supply.id}/edit`
							},
							{
								name: 'Delete',
								path: `/admin/products/${product.id}/variants/${variant.id}/supplies/${variant_supply.id}/delete`
							}
						]}
					/>
				</td>
			</tr>
		{/each}
	</Table>
{:else}
	<NotFound />
{/if}
