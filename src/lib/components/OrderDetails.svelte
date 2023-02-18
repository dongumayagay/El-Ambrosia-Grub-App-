<script lang="ts">
	import { currency_formatter, datetime_formatter, display_property } from '$lib/misc/utils';
	// @ts-ignore
	import type { PageData } from './$types';
	import { states } from '$lib/misc/constants';

	export let data: PageData;
	$: order_address = data.order.order_address;
	$: fees = JSON.parse(JSON.stringify(data.order.fees));
</script>

<header class="flex flex-col ">
	<section class="flex sm:justify-center">
		<ul class="steps steps-vertical sm:steps-horizontal">
			{#each states as state, index}
				<li class="step capitalize" class:step-primary={data.order.status >= index}>{state}</li>
			{/each}
		</ul>
	</section>
	<section>
		<div class=" grid sm:grid-cols-2 gap-x-4">
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Order ID</span>
				</label>
				<input class="input input-bordered" readonly value={data.order.id} />
			</div>
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Ordered at</span>
				</label>
				<input
					class="input input-bordered"
					readonly
					value={datetime_formatter(data.order.created_at)}
				/>
			</div>
			{#if data.order.status > 0}
				<div class="form-control col-span-full">
					<label class="label" for="">
						<span class="label-text">Mode of Payment</span>
					</label>
					<input class="input input-bordered " readonly value={data.order.payment_type} />
				</div>
			{/if}
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">First name</span>
				</label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'first_name')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Last name</span>
				</label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'last_name')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label">
					<span class="label-text">Email Address</span>
				</label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'email_address')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label"> <span class="label-text">Phone number </span></label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'phone_number')}
				/>
			</div>

			<div class="form-control col-span-full">
				<label class="label" for="">
					<span class="label-text">Street line 1</span>
				</label>
				<input
					class="input input-bordered "
					readonly
					value={display_property(order_address, 'street_line1')}
				/>
			</div>
			<div class="form-control col-span-full">
				<label class="label" for="">
					<span class="label-text">Street line 2</span>
				</label>
				<input
					class="input input-bordered "
					readonly
					value={display_property(order_address, 'street_line2')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label"> <span class="label-text">City / Municipality </span></label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'city')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label"> <span class="label-text">Province </span></label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'state')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label"> <span class="label-text">Postal code </span></label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'postal_code')}
				/>
			</div>
			<div class="form-control">
				<label for="" class="label"> <span class="label-text">Country </span></label>
				<input
					class="input input-bordered"
					readonly
					value={display_property(order_address, 'country')}
				/>
			</div>
		</div>
	</section>
</header>
<br />
<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr class="sticky top-0 sm:hidden">
				<th class=" bg-brand-tan">Item</th>
			</tr>

			<tr class="sticky top-0 hidden sm:table-row">
				<th class=" bg-brand-tan">Item</th>
				<th class=" bg-brand-tan">Quantity</th>
				<th class=" bg-brand-tan">Price</th>
			</tr>
		</thead>
		<tbody>
			{#each data.order_items as item (item.id)}
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
					<td>{currency_formatter(display_property(item.product_variants, 'price'))}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<br />
	<ul class="flex flex-col gap-4 px-4">
		<li class="flex justify-between">
			<span>Subtotal </span>
			<span>{currency_formatter(data.order.subtotal)}</span>
		</li>
		<li class="flex justify-between">
			<span>Delivery fee </span>
			<span>{currency_formatter(fees[0].value)}</span>
		</li>
		<li class="flex justify-between">
			<span>Donation </span>
			<span>{currency_formatter(fees[1].value)}</span>
		</li>
		<li class="flex justify-between font-bold text-lg">
			<span>Total</span>
			<span>{currency_formatter(data.order.total)}</span>
		</li>
	</ul>
	<br />
</div>
{#if data.order.pay_on_delivery_id_url}
	<img
		src={data.order.pay_on_delivery_id_url}
		alt="valid id of the order owner for verification"
		class=" w-full max-w-lg mx-auto"
	/>
	<br />
{/if}
