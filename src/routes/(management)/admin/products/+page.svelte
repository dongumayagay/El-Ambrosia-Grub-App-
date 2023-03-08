<script lang="ts">
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let products = data.products;
</script>

<Controls>
	<a href="/admin/products/add" class="btn btn-sm gap-2 ml-auto">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
			/>
		</svg>
		Product</a
	>
</Controls>

<Table table_headers={['name', 'description', '']}>
	{#each products as product (product.id)}
		<tr class="hover">
			<td>{product.name}</td>
			<td>
				{product.description}
			</td>
			<td>
				<ActionMenuDropdownLinks
					links={[
						{
							name: 'View',
							path: `/admin/products/${product.id}`
						},
						{
							name: 'View Variants',
							path: `/admin/products/${product.id}/variants`
						},
						{
							name: 'Update Info',
							path: `/admin/products/${product.id}/edit`
						},
						{
							name: 'Delete',
							path: `/admin/products/${product.id}/delete`
						}
					]}
				/>
			</td>
		</tr>
	{/each}
</Table>
