<script lang="ts">
	import NotFound from '$lib/components/NotFound.svelte';
	import { display_property } from '$lib/utils';
	import type { PageData } from './$types';
	import ActionMenu from './ActionMenu.svelte';

	export let data: PageData;
	const { product, variant, variant_supplies } = data;
</script>

{#if product && variant}
	<div class="prose">
		<h2>{product.name} {variant.name} supplies will consume</h2>
	</div>
	<a href={`/admin/products/${product.id}/variants/${variant.id}/supplies/add`} class="btn gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			<path
				fill-rule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
				clip-rule="evenodd"
			/>
		</svg>
		Add supplies will consume</a
	>
	<div class="flex-1 overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>name</th>
					<th>amount use</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody>
				{#each variant_supplies as variant_supply (variant_supply.id)}
					<tr class="hover">
						<td>{display_property(variant_supply.supplies, 'name')}</td>
						<td>
							{variant_supply.amount_use}
							{display_property(variant_supply.supplies, 'unit')}
						</td>
						<td>
							<ActionMenu
								product_id={product.id}
								variant_id={variant.id}
								variant_supply_id={variant_supply.id}
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
