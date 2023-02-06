<script lang="ts">
	import { Order_States } from '$lib/misc/constants';
	import { datetime_formatter, display_property } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	const states = Object.keys(Order_States).filter((v) => isNaN(Number(v)));
</script>

{#if data.order && data.order_items}
	<main class="flex flex-col sm:flex-col-reverse py-8">
		<section>
			<div class="form-control w-full">
				<label for="" class="label">
					<span class="label-text">Date Ordered</span>
				</label>
				<input
					type="text"
					value={datetime_formatter(data.order.created_at)}
					class="input input-bordered w-full"
					disabled
				/>
			</div>
			<div class="form-control w-full">
				<label for="" class="label">
					<span class="label-text">Total</span>
				</label>
				<input
					type="text"
					value={`₱${data.order.total}`}
					class="input input-bordered w-full"
					disabled
				/>
			</div>
			<br />
			{#if data.order.status === 0}
				<form class="form-control" method="post">
					<button class="btn">PAY</button>
				</form>
			{/if}
		</section>
		<section class="flex sm:justify-center">
			<ul class="steps steps-vertical sm:steps-horizontal">
				{#each states as state, index}
					<li class="step uppercase" class:step-primary={data.order.status >= index}>{state}</li>
				{/each}
			</ul>
		</section>
	</main>
	<div class="overflow-x-auto">
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
				{#each data.order_items as item (item.id)}
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
										<h5>Qty: {item.quantity}</h5>
									</article>
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
						<td>{item.quantity}</td>
						<td>₱ {display_property(item.product_variants, 'price')}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<br />
	</div>
{/if}
