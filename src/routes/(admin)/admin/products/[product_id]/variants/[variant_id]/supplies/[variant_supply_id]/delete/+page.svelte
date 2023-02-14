<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import { display_property } from '$lib/misc/utils';

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
				readonly
				class="input input-bordered cursor-text"
				value={display_property(variant_supply.supplies, 'name')}
			/>
		</div>
		<br />
		<button class="btn btn-block btn-error" class:loading disabled={loading}>Delete</button>
		<br />
		{#if form?.error}
			<br />
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
	</form>
{:else}
	<NotFound />
{/if}
