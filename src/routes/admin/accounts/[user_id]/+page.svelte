<script lang="ts">
	import { datetime_formatter } from '$lib/utils';
	import type { PageData } from './$types';
	import ChangeRole from './ChangeRole.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	const user = data.user_info;
</script>

<div class="prose w-full max-w-md grid sm:grid-cols-2 gap-2">
	<h2 class="col-span-full">User Information</h2>
	<div class=" col-span-full form-control ">
		<label class="label" for=""> <span class="label-text">UID</span> </label>
		<input type="text" disabled class="input input-bordered cursor-text" value={user.id} />
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Email address</span> </label>
		<input type="text" class="input input-bordered" disabled value={user.email_address} />
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Phone number</span> </label>
		<input type="text" class="input input-bordered" disabled value={user.phone_number} />
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Created at</span> </label>
		<input
			type="text"
			class="input input-bordered"
			disabled
			value={datetime_formatter(user.created_at)}
		/>
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Last sign in</span> </label>
		<input
			type="text"
			class="input input-bordered"
			disabled
			value={datetime_formatter(user.last_sign_in_at)}
		/>
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">First name</span> </label>
		<input type="text" class="input input-bordered" disabled value={user.first_name} />
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Last name</span> </label>
		<input type="text" class="input input-bordered" disabled value={user.last_name} />
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Role / Position</span> </label>
		<input type="text" class="input input-bordered" disabled value={user.position} />
	</div>
</div>
<ChangeRole {form} user_id={user.id ?? ''} />
