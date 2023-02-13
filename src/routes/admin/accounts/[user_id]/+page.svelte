<script lang="ts">
	import { datetime_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class=" grid sm:grid-cols-2 gap-4">
	<div class="form-control col-span-full">
		<label class="label" for="">
			<span class="label-text">User ID</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.id} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Created at</span>
		</label>
		<input
			class="input input-bordered "
			readonly
			value={datetime_formatter(data.auth_user?.created_at)}
		/>
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Last sign in</span>
		</label>
		<input
			class="input input-bordered "
			readonly
			value={datetime_formatter(data.auth_user?.last_sign_in_at)}
		/>
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">First name</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.first_name} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Last name</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.last_name} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Email</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.email_address} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Phone number</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.phone_number} />
	</div>
	<div class="form-control col-span-full">
		<label class="label" for="">
			<span class="label-text">Street line 1</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.street_line1} />
	</div>
	<div class="form-control col-span-full">
		<label class="label" for="">
			<span class="label-text">Street line 2</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.street_line2} />
	</div>

	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">City / Municipality</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.city} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Province</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.state} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Postal code</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.postal_code} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Country</span>
		</label>
		<input class="input input-bordered " readonly value={data.address?.country} />
	</div>
</div>
