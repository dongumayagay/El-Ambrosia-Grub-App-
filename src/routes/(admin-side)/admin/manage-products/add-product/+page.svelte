<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { PageData, ActionData } from './$types';

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

<main class="h-full flex flex-col  p-4">
	<h1 class="font-bold text-2xl uppercase">Adding new product</h1>

	<form action="?/add_product" method="post" use:enhance={enhance_function} class="w-full max-w-sm">
		<div class="form-control">
			<label class="label" for="name">
				<span class="label-text">Product name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder={`Underdog 6\"`}
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
				class="textarea textarea-bordered"
				required
			/>
		</div>
		<!-- <div class="form-control">
			<label class="label" for="variant_name">
				<span class="label-text">Product variant name</span>
			</label>
			<input
				type="text"
				name="variant_name"
				placeholder="regular / chicken / steak"
				class="input input-bordered "
				required
			/>
		</div>
		<div class="form-control">
			<label class="label" for="variant_price">
				<span class="label-text">Product variant price</span>
			</label>
			<input
				type="number"
				name="variant_price"
				placeholder="100"
				class="input input-bordered "
				required
			/>
		</div> -->
		<!-- <p>Supplies that product variant will use</p>
		<input type="search" class="input input-bordered" /> -->
		<br />
		<button disabled={loading} class="btn btn-block" class:loading>add product</button>
		<!-- {#if form?.error}
			<p class="text-center text-error">{form.error}</p>
		{/if} -->
	</form>
</main>
