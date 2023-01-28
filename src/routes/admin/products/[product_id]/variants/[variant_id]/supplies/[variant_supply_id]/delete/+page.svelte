<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import { display_supply_property } from '$lib/utils';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;

	const { variant_supply } = data;
	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if variant_supply}
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2>Delete product variant supply will consume</h2>
		<input type="hidden" name="variant_supply_id" value={variant_supply.id} />
		<div class="form-control ">
			<label class="label" for=""> <span class="label-text">Name</span> </label>
			<input
				type="text"
				disabled
				class="input input-bordered cursor-text"
				value={display_supply_property(variant_supply, 'name')}
			/>
		</div>
		<br />
		<button class="btn btn-block btn-error" class:loading disabled={loading}>Delete</button>
		<br />
		{#if form?.error}
			<p class=" text-center text-error font-bold">{form.error}</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
