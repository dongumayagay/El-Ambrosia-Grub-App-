<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;
	const { variant } = data;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if variant}
	<form method="post" use:enhance={enhance_function} class="w-full max-w-md prose">
		<h2 class="uppercase">Delete variant for {variant.name}</h2>
		<input type="hidden" name="variant_id" value={variant.id} />
		<div class="form-control">
			<label class="label" for="name">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder="regular / chicken / steak / etc"
				class="input input-bordered "
				value={variant.name}
				required
				disabled
			/>
		</div>

		<br />
		<button disabled={loading} class="btn btn-block btn-error" class:loading>Delete variant</button>
		<br />
		{#if form?.error}
			<p class="text-center text-error font-bold">{form.error}</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
