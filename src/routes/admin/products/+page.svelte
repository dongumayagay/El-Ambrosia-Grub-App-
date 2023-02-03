<script lang="ts">
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let products = data.products;
</script>

<a href="/admin/products/add" class="btn gap-2">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
		<path
			fill-rule="evenodd"
			d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
			clip-rule="evenodd"
		/>
	</svg>
	Add New Product</a
>

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
							name: 'view variants',
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
