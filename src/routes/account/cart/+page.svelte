<script lang="ts">
	import { enhance } from '$app/forms';
	import { display_property } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.cart_items}
	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<!-- small screen -->
				<tr class="sm:hidden">
					<th>Item</th>
				</tr>
				<!-- medium to large screen -->
				<tr class="hidden sm:table-row">
					<th>Item</th>
					<th>Quantity</th>
					<th>Price</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each data.cart_items as item (item.id)}
					<!-- small screen -->
					<tr class="sm:hidden">
						<td class="">
							<div class="flex gap-2">
								<figure class="avatar">
									<div class=" w-28 h-28 rounded">
										<img
											src={display_property(item.products, 'image_url')}
											alt={`${display_property(item.product_variants, 'name')} ${display_property(
												item.products,
												'name'
											)}`}
											class="object-cover"
										/>
									</div>
								</figure>
								<div class="w-full">
									<article class="prose ">
										<h4>
											{display_property(item.product_variants, 'name')}
											{display_property(item.products, 'name')}
										</h4>
										<h5>₱ {display_property(item.product_variants, 'price')}</h5>
									</article>
									<div class="flex justify-between">
										<form use:enhance action="?/change_quantity" method="post" class="contents">
											<input type="hidden" name="cart_item_id" value={item.id} />
											<input
												type="number"
												name="quantity"
												min="1"
												max="99"
												bind:value={item.quantity}
												class="input input-bordered w-32 text-center"
											/>
											<button class="hidden" />
										</form>
										<form action="?/remove_cart_item" method="post" class="contents" use:enhance>
											<input type="hidden" name="cart_item_id" value={item.id} />
											<button class="btn btn-ghost btn-square"
												><svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-6 h-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg></button
											>
										</form>
									</div>
								</div>
							</div>
						</td>
					</tr>
					<!-- medium to large screen -->
					<tr class="hidden sm:table-row">
						<td class="w-full max-w-sm">
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
								<article class="prose">
									<h2>
										{display_property(item.product_variants, 'name')}
										{display_property(item.products, 'name')}
									</h2>
									<p class=" break-all whitespace-normal ">
										{display_property(item.products, 'description')}
									</p>
								</article>
							</div>
						</td>
						<td
							><form use:enhance action="?/change_quantity" method="post" class="contents">
								<input type="hidden" name="cart_item_id" value={item.id} />
								<input
									type="number"
									name="quantity"
									min="1"
									max="99"
									bind:value={item.quantity}
									class="input input-bordered w-32 text-center"
								/>
								<button class="hidden" />
							</form></td
						>
						<td>₱ {display_property(item.product_variants, 'price')}</td>
						<td>
							<form action="?/remove_cart_item" method="post" class="contents" use:enhance>
								<input type="hidden" name="cart_item_id" value={item.id} />
								<button class="btn btn-ghost btn-square"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg></button
								>
							</form>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="text-center font-bold">
							<div class="prose text-center mx-auto">
								<h2>No item on cart</h2>
							</div>
							<br />
							<a href="/products" class="btn">Go to products</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if data.cart_items.length !== 0}
			<div class=" px-4 flex flex-col justify-between gap-4 sm:flex-row-reverse">
				<form action="?/checkout" method="post" class="contents">
					<button class="btn btn-primary sm:btn-wide">Checkout</button>
				</form>
				<a href="/products" class="btn sm:btn-wide">Back to products</a>
			</div>
		{/if}
	</div>
{:else}
	e
{/if}
