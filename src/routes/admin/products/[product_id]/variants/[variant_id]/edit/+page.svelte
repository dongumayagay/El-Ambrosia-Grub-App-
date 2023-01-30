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
		<h2 class="uppercase">Update variant for {variant.name}</h2>
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
			/>
		</div>
		<div class="form-control">
			<label class="label" for="price">
				<span class="label-text">Price</span>
			</label>
			<input
				type="number"
				name="price"
				placeholder="100"
				class="input input-bordered "
				required
				value={variant.price}
			/>
		</div>

		<br />
		<button disabled={loading} class="btn btn-block" class:loading>update variant</button>
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
