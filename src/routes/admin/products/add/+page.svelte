<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

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

	<br />
	<button disabled={loading} class="btn btn-block" class:loading>add product</button>
	<br />
	{#if form?.error}
		<p class="text-center text-error font-bold">{form.error}</p>
	{/if}
</form>
