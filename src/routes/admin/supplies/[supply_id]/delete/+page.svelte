<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;
	let supply = data.supply;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if supply}
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2>Delete supply</h2>
		<input type="hidden" name="supply_id" value={supply.id} />
		<div class="form-control">
			<label class="label" for="name">
				<span class="label-text">Supply name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder="Supply name"
				class="input input-bordered "
				required
				disabled
				value={supply.name}
			/>
		</div>
		<br />
		<button class="btn btn-block btn-error" class:loading disabled={loading}
			>Confirm deletion</button
		>
		<br />
		{#if form?.error}
			<p class=" text-center text-error font-bold">{form.error}</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
