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
	<div class="prose w-full max-w-md gap-2">
		<h2 class="col-span-full">Current product variant supply will consume Information</h2>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Name</span> </label>
			<input type="text" disabled class="input input-bordered cursor-text" value={product.name} />
		</div>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Description</span> </label>
			<textarea
				cols="30"
				rows="5"
				class="textarea textarea-bordered"
				disabled
				value={product.description}
			/>
		</div>
	</div>
	<br />
	<form method="post" use:enhance={enhance_function} class="w-full max-w-md prose">
		<h2>Adding new product</h2>
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
