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
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Name</span> </label>
			<input type="text" readonly class="input input-bordered cursor-text" value={supply.name} />
		</div>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Current value</span> </label>
			<input
				type="text"
				readonly
				class="input input-bordered cursor-text"
				value={`${supply.value} ${supply.unit}`}
			/>
		</div>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Threshold</span> </label>
			<input
				type="text"
				readonly
				class="input input-bordered cursor-text"
				value={`${supply.threshold} ${supply.unit}`}
			/>
		</div>
		<br />
		<button class="btn btn-block btn-error" class:loading disabled={loading}
			>Confirm deletion</button
		>
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
