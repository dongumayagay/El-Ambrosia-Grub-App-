<script lang="ts">
	import ContactFields from '$lib/components/ContactFields.svelte';
	import { Order_States } from '$lib/misc/constants';
	import { datetime_formatter, display_property } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	const states = Object.keys(Order_States).filter((v) => isNaN(Number(v)));
</script>

{#if data.order && data.order_items}
	<main class="flex flex-col sm:flex-col-reverse">
		<section>
			<!-- <div class="form-control w-full">
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
			<br /> -->
			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
			<!-- <div class=" grid sm:grid-cols-2 gap-4">
				<div class="form-control">
					<label class="label" for="first_name">
						<span class="label-text">First name</span>
					</label>
					<input
						type="text"
						name="first_name"
						placeholder="First name"
						class="input input-bordered "
						required
						value={data.order.first_name ?? ''}
					/>
				</div> -->
			<!-- <div class="form-control">
					<label class="label" for="last_name">
						<span class="label-text">Last name</span>
					</label>
					<input
						type="text"
						name="last_name"
						placeholder="Last name"
						class="input input-bordered "
						required
						value={data.order. ?? ''}
					/>
				</div>
				<div class="form-control col-span-full">
					<label class="label" for="phone_number">
						<span class="label-text">Phone number</span>
					</label>
					<input
						type="tel"
						name="phone_number"
						placeholder="Phone number"
						class="input input-bordered "
						required
						value={data.order. ?? ''}
						pattern={String.raw`^(09|\+639)\d{9}$`}
						title="enter proper phone number"
					/>
				</div>
				<div class="form-control col-span-full">
					<label class="label" for="street_line1">
						<span class="label-text">Street line 1</span>
					</label>
					<input
						type="text"
						name="street_line1"
						placeholder="Street line 1"
						class="input input-bordered "
						required
						value={data.address?.street_line1 ?? ''}
					/>
				</div>
				<div class="form-control col-span-full">
					<label class="label" for="street_line2">
						<span class="label-text">Street line 2</span>
					</label>
					<input
						type="text"
						name="street_line2"
						placeholder="Street line 2"
						class="input input-bordered "
						value={data.address?.street_line2 ?? ''}
					/>
				</div>
				<div class="form-control col-span-full">
					<label for="" class="label">
						<span class="label-text">Select location</span>
					</label>
					<select
						name=""
						class="select select-bordered"
						required
						on:change={(event) => {
							data.address = data.delivery_locations[event.currentTarget.value];
						}}
					>
						<option value="">Select location</option>
						{#each data.delivery_locations as loc, index (loc.id)}
							<option value={index} selected={loc.postal_code === data.address.postal_code}>
								{loc.city},
								{loc.state},
								{loc.postal_code}
							</option>
						{/each}
					</select>
				</div>
				<div>
					<input type="hidden" name="city" value={data.address.city} />
					<input type="hidden" name="state" value={data.address.state} />
					<input type="hidden" name="postal_code" value={data.address.postal_code} />
				</div>
			</div> -->
			<!-- </div> -->
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
