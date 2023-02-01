<script lang="ts">
	import { display_property } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	let { cart_items } = data;
</script>

{#if cart_items}
	<div class="overflow-x-auto">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each cart_items as item}
					<!-- row 1 -->
					<tr>
						<td>
							<!-- <div class="avatar">
								<div class=" w-32 rounded">
									<img
										src={display_property(item.products, 'image_url')}
										alt=""
										class="object-cover"
									/>
								</div>
							</div> -->
							<div class="flex gap-4">
								<figure class="avatar">
									<div class=" w-32 rounded">
										<img
											src={display_property(item.products, 'image_url')}
											alt=""
											class="object-cover"
										/>
									</div>
								</figure>
								<div>
									<div class="font-bold">
										{display_property(item.product_variants, 'name')}
										{display_property(item.products, 'name')}
									</div>
									<div class="text-sm opacity-50">United States</div>
								</div>
							</div>
						</td>
						<td>{item.quantity}</td>
						<td>₱ {display_property(item.product_variants, 'price')}</td>
						<td
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="text-center font-bold"> No item on cart </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	e
{/if}
