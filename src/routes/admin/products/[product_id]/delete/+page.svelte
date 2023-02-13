<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import ProductInfo from '../ProductInfo.svelte';

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
	<ProductInfo {data} />
	<form method="post" use:enhance={enhance_function} class="grid">
		<button disabled={loading} class="btn btn-block btn-error" class:loading>Delete product</button>
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
{:else}
	<NotFound />
{/if}
