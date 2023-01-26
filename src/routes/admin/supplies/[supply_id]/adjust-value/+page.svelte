<script lang="ts">
	import { supabaseClient } from '$lib/db/client';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

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
	onMount(() => {
		if (supply) {
			const supply_realtime_listener = supabaseClient
				.channel('supply-channel')
				.on(
					'postgres_changes',
					{ event: 'UPDATE', schema: 'public', table: 'supplies', filter: `id=eq.${supply.id}` },
					(payload) => {
						console.log('Change received!', payload);
						if (payload.eventType === 'UPDATE') {
							// @ts-ignore
							supply = payload.new;
						}
					}
				)
				.subscribe();
			return () => {
				supply_realtime_listener.unsubscribe();
			};
		}
	});
</script>

{#if supply}
	<div class="prose w-full max-w-md gap-2">
		<h1 class="col-span-full">Supply Information</h1>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Name</span> </label>
			<input type="text" disabled class="input input-bordered cursor-text" value={supply.name} />
		</div>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Current value</span> </label>
			<input
				type="text"
				disabled
				class="input input-bordered cursor-text"
				value={`${supply.value} ${supply.unit}`}
			/>
		</div>
		<div class=" col-span-full form-control ">
			<label class="label" for=""> <span class="label-text">Threshold</span> </label>
			<input
				type="text"
				disabled
				class="input input-bordered cursor-text"
				value={`${supply.threshold} ${supply.unit}`}
			/>
		</div>
	</div>
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2>Adjust supply value</h2>
		<p class=" text-info text-center">*will increase or decrease base on value adjusted by</p>
		<input type="hidden" name="supply_id" value={supply.id} />
		<label class="label" for="adjust_value_input">
			<span class="label-text">Value that will increase or decrease supply current value</span>
		</label>
		<div class="form-control">
			<label class="input-group">
				<input
					type="number"
					name="adjust_value_input"
					placeholder="Enter value"
					class="input input-bordered w-full"
				/>
				<span>{supply.unit}</span>
			</label>
		</div>
		<br />
		<button class="btn btn-block" class:loading disabled={loading}>Adjust</button>
		<br />
		{#if form?.error}
			<p class=" text-center text-error">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-center text-success">Supply has been successfully adjusted</p>
		{/if}
	</form>
{/if}

<!-- <div class="h-full flex flex-col p-4">
	<main class="w-full max-w-md">
		<div>
			<h1 class="text-xl">Supply</h1>
			<h1 class="text-xl">Name: {supply.name}</h1>
			<h1 class="text-xl">Current value: {supply.value} {supply.unit}</h1>
			<h1 class="text-xl">threshold value: {supply.threshold} {supply.unit}</h1>
		</div>
		<br />
		<form method="post" class="" use:enhance={enhance_function}>
			<h1 class="text-lg">Adjust supply value by:</h1>
			<p class=" text-info text-center">*will increase/decrease base on value adjusted by</p>
			<div class="form-control">
				<label class="input-group">
					<input type="hidden" name="supply_id" value={supply.id} />
					<input
						type="number"
						name="adjust_value_input"
						placeholder="Enter value"
						class="input input-bordered w-full"
					/>
					<span>{supply.unit}</span>
				</label>
			</div>
			<br />
			<button class="btn btn-block" class:loading disabled={loading}>Adjust</button>
			<br />
			{#if form?.error}
				<p class=" text-center text-error">{form.error}</p>
			{/if}
			{#if form?.success}
				<p class="text-center text-success">Supply has been successfully adjusted</p>
			{/if}
		</form>

		<br />
	</main>
</div> -->
