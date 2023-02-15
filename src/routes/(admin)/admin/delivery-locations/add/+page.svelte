<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<form method="post" use:enhance={enhance_function} class="grid">
	<h2>Adding delivery location</h2>
	<div class="form-control">
		<label class="label" for="unit">
			<span class="label-text">City / Municipality</span>
		</label>
		<input
			type="text"
			name="city"
			placeholder="City / Municipality"
			class="input input-bordered "
			required
		/>
	</div>
	<div class="form-control">
		<label class="label" for="state">
			<span class="label-text">Province</span>
		</label>
		<input type="text" name="state" placeholder="Province" class="input input-bordered " required />
	</div>
	<div class="form-control">
		<label class="label" for="postal_code">
			<span class="label-text">Postal code</span>
		</label>
		<input
			type="number"
			name="postal_code"
			placeholder="Postal code"
			class="input input-bordered "
			required
		/>
	</div>
	<div class="form-control">
		<label class="label" for="fee">
			<span class="label-text">Delivery fee</span>
		</label>
		<input
			type="number"
			name="fee"
			placeholder="Delivery fee"
			class="input input-bordered "
			required
		/>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Enable</span>
			<input type="hidden" name="enable" value="off" />
			<input type="checkbox" name="enable" class="toggle" checked />
		</label>
	</div>
	<br />
	<button disabled={loading} class="btn btn-block" class:loading>Save new supply</button>
</form>
{#if form?.error}
	<div class="alert alert-error shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{form.error}</span>
		</div>
	</div>
{/if}
