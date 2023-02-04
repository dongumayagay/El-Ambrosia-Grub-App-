<script lang="ts">
	import { currency_formatter } from '$lib/misc/utils';
	import cart from '$lib/stores/cart';
</script>

<table class="table w-full">
	<thead>
		<!-- small screen -->
		<tr class="sticky top-0 sm:hidden">
			<th>Item</th>
		</tr>
		<!-- medium to large screen -->
		<tr class="sticky top-0 hidden sm:table-row">
			<th>Item</th>
			<th>Quantity</th>
			<th>Price</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each $cart as item (item.variant_id)}
			<!-- small screen -->
			<tr class="sm:hidden hover">
				<td class="">
					<div class="flex gap-2">
						<figure class="avatar">
							<div class=" w-28 h-28 rounded">
								<img src={item.image_url} alt={item.name} class="object-cover" />
							</div>
						</figure>
						<div class="w-full">
							<article class="prose ">
								<h4>
									{item.name}
								</h4>
								<h5>{currency_formatter(item.price)}</h5>
							</article>
							<div class="flex justify-between">
								<input
									type="number"
									bind:value={item.quantity}
									min="1"
									on:change={() => {
										if (item.quantity < 1 || item.quantity === null) item.quantity = 1;
									}}
									class="text-center input input-bordered w-32"
								/>
								<button
									on:click={() => cart.removeItem(item.variant_id)}
									class="btn btn-ghost btn-square"
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
								</button>
							</div>
						</div>
					</div>
				</td>
			</tr>
			<!-- medium to large screen -->
			<tr class="hidden sm:table-row hover">
				<td class="w-full max-w-sm">
					<div class="flex gap-4">
						<figure class="avatar">
							<div class=" w-32 rounded">
								<img src={item.image_url} alt="" class="object-cover" />
							</div>
						</figure>
						<article class="prose">
							<h2>{item.name}</h2>
						</article>
					</div>
				</td>
				<td>
					<input
						type="number"
						bind:value={item.quantity}
						min="1"
						on:change={() => {
							if (item.quantity < 1 || item.quantity === null) item.quantity = 1;
						}}
						class="text-center input input-bordered"
					/>
				</td>
				<td>{currency_formatter(item.price)}</td>
				<td>
					<button on:click={() => cart.removeItem(item.variant_id)} class="btn btn-ghost btn-square"
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
					</button>
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
