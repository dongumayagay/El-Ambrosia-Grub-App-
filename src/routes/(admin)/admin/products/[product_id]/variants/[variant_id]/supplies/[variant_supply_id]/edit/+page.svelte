<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import { display_property } from '$lib/misc/utils';

	export let data: PageData;
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

<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
	<div class="form-control">
		<label class="label" for="threshold">
			<span class="label-text">Amount will use</span>
		</label>
		<input
			type="number"
			name="amount_use"
			placeholder="Supply threshold value"
			class="input input-bordered "
			required
			value={data.variant_supply?.amount_use}
		/>
	</div>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
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
