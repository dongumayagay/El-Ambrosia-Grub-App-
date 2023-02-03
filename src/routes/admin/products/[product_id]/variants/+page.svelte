<script lang="ts">
	import NotFound from '$lib/components/NotFound.svelte';
	import type { PageData } from './$types';
	import ActionMenuDropdownLinks from '$lib/components/ActionMenuDropdownLinks.svelte';

	export let data: PageData;
	const { product, variants } = data;
</script>

{#if product}
	<div class="prose">
		<h2>{product.name} Variants</h2>
	</div>

	<a href={`/admin/products/${product.id}/variants/add`} class="btn gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
		Add product variant</a
	>

	<div class="flex-1 overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr class="sticky top-0">
					<th>name</th>
					<th>price</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody>
				{#each variants as variant (variant.id)}
					<tr class="hover">
						<td>{variant.name}</td>
						<td>
							{variant.price}
						</td>
						<td>
							<!--  -->
							<ActionMenuDropdownLinks
								links={[
									{
										name: 'view supplies will use',
										path: `/admin/products/${product.id}/variants/${variant.id}/supplies`
									},
									{
										name: 'Update Info',
										path: `/admin/products/${product.id}/variants/${variant.id}/edit`
									},
									{
										name: 'Delete',
										path: `/admin/products/${product.id}/variants/${variant.id}/delete`
									}
								]}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="btn-group grid grid-cols-2">
		<button class="btn btn-outline">Previous page</button>
		<button class="btn btn-outline">Next</button>
	</div>
{:else}
	<NotFound />
{/if}
