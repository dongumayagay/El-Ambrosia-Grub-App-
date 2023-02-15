<script lang="ts">
	import NotFound from '$lib/components/NotFound.svelte';
	import type { PageData } from './$types';
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';
	import Table from '$lib/components/Table.svelte';
	import { currency_formatter } from '$lib/misc/utils';
	import ProductName from '../ProductName.svelte';
	import Controls from '$lib/components/Controls.svelte';

	export let data: PageData;
</script>

<ProductName {data} />
<Controls>
	<a href={`/admin/products/${data.product?.id}/variants/add`} class="btn btn-sm gap-2 ml-auto">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
			/>
		</svg>
		variant
	</a>
</Controls>

<Table table_headers={['name', 'price', 'actions']}>
	{#each data.variants as variant (variant.id)}
		<tr class="hover">
			<td>{variant.name}</td>
			<td>
				{currency_formatter(variant.price)}
			</td>
			<td>
				<ActionMenuDropdownLinks
					links={[
						{
							name: 'View',
							path: `/admin/products/${data.product?.id}/variants/${variant.id}`
						},
						{
							name: 'View supplies will use',
							path: `/admin/products/${data.product?.id}/variants/${variant.id}/supplies`
						},
						{
							name: 'Update Info',
							path: `/admin/products/${data.product?.id}/variants/${variant.id}/edit`
						},
						{
							name: 'Delete',
							path: `/admin/products/${data.product?.id}/variants/${variant.id}/delete`
						}
					]}
				/>
			</td>
		</tr>
	{/each}
</Table>
