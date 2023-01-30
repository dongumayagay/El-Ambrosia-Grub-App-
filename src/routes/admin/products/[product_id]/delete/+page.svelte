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
		<h2>Delete product</h2>
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
				disabled
				required
			/>
		</div>

		<br />
		<button disabled={loading} class="btn btn-block btn-error" class:loading>Delete product</button>
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
