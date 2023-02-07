<script lang="ts">
	import { display_property } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	$: order_address = data.order.order_address;
</script>

<div class=" grid sm:grid-cols-2 gap-4">
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
		<input class="input input-bordered" readonly value={display_property(order_address, 'city')} />
	</div>
	<div class="form-control">
		<label for="" class="label"> <span class="label-text">Province </span></label>
		<input class="input input-bordered" readonly value={display_property(order_address, 'state')} />
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
