<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading: boolean;

	let product_image: any;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};

	function on_product_image_file_input_change(e: any) {
		product_image = null;
		let image = e.target.files[0];
		console.log(image);
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			if (e.target) product_image = e.target.result;
		};
	}
</script>

<form method="post" use:enhance={enhance_function} class="w-full max-w-md prose">
	<h2>Adding new product</h2>
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
	<div class="form-control">
		<label class="label" for="product_image">
			<span class="label-text">Upload product image</span>
		</label>
		{#if product_image}
			<img src={product_image} alt="" class="m-0" />
			<br />
		{/if}
		<input
			on:change={on_product_image_file_input_change}
			type="file"
			class="file-input file-input-bordered"
			accept="image/"
			name="product_image"
		/>
	</div>

	<br />
	<button disabled={loading} class="btn btn-block" class:loading>add product</button>
	<br />
	{#if form?.error}
		<p class="text-center text-error font-bold">{form.error}</p>
	{/if}
</form>
