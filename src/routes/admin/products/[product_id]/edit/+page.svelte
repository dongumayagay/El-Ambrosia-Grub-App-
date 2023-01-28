<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;

	const { product } = data;
	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if product}
	<form method="post" use:enhance={enhance_function} class="w-full max-w-md prose">
		<h2>Update product</h2>
		<input type="hidden" name="product_id" value={product.id} />
		<div class="form-control">
			<label class="label" for="name">
				<span class="label-text">Product name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder={`Underdog 6\"`}
				value={product.name}
				class="input input-bordered "
				required
			/>
		</div>
		<div class="form-control">
			<label class="label" for="description">
				<span class="label-text">Product description</span>
			</label>
			<textarea
				cols="30"
				rows="5"
				name="description"
				placeholder="super duper very delicious"
				value={product.description}
				class="textarea textarea-bordered"
				required
			/>
		</div>

		<br />
		<button disabled={loading} class="btn btn-block" class:loading>update product</button>
		<br />
		{#if form?.error}
			<p class="text-center text-error font-bold">{form.error}</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
