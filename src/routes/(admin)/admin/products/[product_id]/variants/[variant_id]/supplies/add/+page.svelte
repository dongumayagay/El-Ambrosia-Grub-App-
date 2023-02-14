<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';
	import { supabaseClient } from '$lib/db/client';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { product, variant } = data;
	let timer: NodeJS.Timeout;

	// let { supply_options } = data;
	let supply_options: { name: string }[] = data.supply_options;

	async function debounce(e: Event) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-ignore
			const search_input_value = (e.target.value as string).trim();
			loadSupplyOptions(search_input_value);
		}, 500);
	}
	async function loadSupplyOptions(search_input_value: string) {
		console.log(search_input_value);
		if (!search_input_value) {
			const { data } = await supabaseClient.from('supplies').select('name').limit(10);
			supply_options = data ?? [];
		} else {
			const { data } = await supabaseClient
				.from('supplies')
				.select('name')
				.textSearch('name', search_input_value, { type: 'websearch' })
				.limit(10);
			supply_options = data ?? [];
			console.log(supply_options);
		}
	}

	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<form method="post" class="grid" use:enhance={enhance_function}>
	<div class="form-control">
		<label class="label" for="supply_name">
			<span class="label-text">Supply name</span>
		</label>
		<datalist id="supply-options">
			{#each supply_options as supply}
				<option class=" btn" value={supply.name} />
			{/each}
		</datalist>
		<input
			autoComplete="on"
			list="supply-options"
			class="input input-bordered"
			placeholder="Search supply..."
			on:keyup={debounce}
			required
			name="supply_name"
		/>
	</div>
	<div class="form-control">
		<label class="label" for="amount_use">
			<span class="label-text">Supply amount will consume</span>
		</label>
		<label class="input-group">
			<input
				type="number"
				name="amount_use"
				placeholder="100"
				class="input input-bordered flex-1"
				required
				min="1"
			/>
			<span>unit</span>
		</label>
	</div>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}
		>Add Supply for product variant</button
	>
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
