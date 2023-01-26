<script lang="ts">
	import { supabaseClient } from '$lib/db/client';
	import type { PageData } from './$types';

	export let data: PageData;
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
</script>

{#if product && variant}
	<main class="h-full flex flex-col p-4">
		<h1 class="font-bold text-2xl uppercase">Adding variant for {product.name}</h1>
		<form method="post" class=" w-full max-w-sm">
			<div class="form-control">
				<label class="label" for="name">
					<span class="label-text">Supply name</span>
				</label>
				<datalist id="supply-options">
					<div class="form-control">
						<label class="label" for="price">
							<span class="label-text">Price</span>
						</label>
						{#each supply_options as supply}
							<option class=" btn" value={supply.name} />
						{/each}
						<!-- <option>First option</option>
            <option>Second Option</option> -->
					</div></datalist
				>
				<input
					autoComplete="on"
					list="supply-options"
					class="input input-bordered"
					placeholder="Search supply..."
					on:keyup={debounce}
					required
				/>
			</div>
			<div class="form-control">
				<label class="label" for="amount_will_use">
					<span class="label-text">Supply amount will consume</span>
				</label>
				<input
					type="number"
					name="amount_will_use"
					placeholder="100"
					class="input input-bordered "
					required
				/>
			</div>
			<br />
			<button class="btn btn-block">Add Supply for product variant</button>
		</form>
	</main>
{/if}
