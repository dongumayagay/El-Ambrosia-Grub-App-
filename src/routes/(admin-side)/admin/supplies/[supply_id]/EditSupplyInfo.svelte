<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;
	$: supply = data.supply;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};
</script>

<form method="post" class="" use:enhance={enhance_function}>
	<h1 class="text-lg">Update supply information</h1>

	<input type="hidden" name="supply_id" value={supply.id} />
	<div class="form-control">
		<label class="label" for="name">
			<span class="label-text">Supply name</span>
		</label>
		<input
			type="text"
			name="name"
			placeholder="Supply name"
			class="input input-bordered "
			required
			value={supply.name}
		/>
	</div>
	<div class="form-control">
		<label class="label" for="unit">
			<span class="label-text">Supply unit of measurement</span>
		</label>
		<input
			type="text"
			name="unit"
			placeholder="Supply unit of measurement"
			class="input input-bordered "
			required
			value={supply.unit}
		/>
	</div>
	<div class="form-control">
		<label class="label" for="threshold">
			<span class="label-text">Supply threshold value</span>
		</label>
		<input
			type="number"
			name="threshold"
			placeholder="Supply threshold value"
			class="input input-bordered "
			required
			value={supply.threshold}
		/>
	</div>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
	<br />
	{#if form?.error}
		<p class=" text-center text-error">{form.error.message}</p>
	{/if}
	{#if form?.success}
		<p class="text-center text-success">Supply information has been successfully updated</p>
	{/if}
</form>
