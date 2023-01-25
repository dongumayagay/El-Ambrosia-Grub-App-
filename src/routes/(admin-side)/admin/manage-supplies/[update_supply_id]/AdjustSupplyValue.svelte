<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;
	let supply = data.supply;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<form action="?/adjust_value" method="post" class="" use:enhance={enhance_function}>
	<h1 class="text-lg">Adjust supply value by:</h1>
	<p class=" text-info text-center">*will increase/decrease base on value adjusted by</p>
	<div class="form-control">
		<label class="input-group">
			<input type="hidden" name="supply_id" value={supply.id} />
			<input
				type="number"
				name="adjust_value_input"
				placeholder="Enter value"
				class="input input-bordered w-full"
			/>
			<span>{supply.unit}</span>
		</label>
	</div>
	<button class="btn btn-block" class:loading disabled={loading}>Adjust</button>
	<br />
	{#if form?.error?.form === 'adjust_value'}
		<p class=" text-center text-error">{form.error.message}</p>
	{/if}
	{#if form?.success === 'adjust_value'}
		<p class="text-center text-success">Supply has been successfully adjusted</p>
	{/if}
</form>
