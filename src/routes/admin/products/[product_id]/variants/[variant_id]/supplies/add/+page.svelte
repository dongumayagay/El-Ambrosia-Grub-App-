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

{#if product && variant}
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2 class="uppercase">Adding variant for {variant.name}</h2>
		<input type="hidden" name="variant_id" value={variant.id} />
		<div class="form-control">
			<label class="label" for="supply_name">
				<span class="label-text">Supply name</span>
			</label>
			<datalist id="supply-options">
				<label class="label" for="price">
					<span class="label-text">Price</span>
				</label>
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
			<input
				type="number"
				name="amount_use"
				placeholder="100"
				class="input input-bordered "
				required
				min="1"
			/>
		</div>
		<br />
		<button class="btn btn-block">Add Supply for product variant</button>
		<br />
		{#if form?.error}
			<p class="text-center text-error font-bold">
				{form.error}
			</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
