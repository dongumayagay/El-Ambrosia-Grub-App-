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

<main class="h-full flex flex-col  p-4">
	<h1 class="font-bold text-2xl uppercase">Adding new supply</h1>

	<form method="post" use:enhance={enhance_function} class="w-full max-w-sm">
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
			/>
		</div>
		<div class="form-control">
			<label class="label" for="value">
				<span class="label-text">Supply current value</span>
			</label>
			<input
				type="number"
				name="value"
				placeholder="Supply current value"
				class="input input-bordered "
				required
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
			/>
		</div>
		<br />
		<button disabled={loading} class="btn btn-block" class:loading>Save new supply</button>
		{#if form?.error}
			<p class="text-center text-error">{form.error}</p>
		{/if}
	</form>
</main>
