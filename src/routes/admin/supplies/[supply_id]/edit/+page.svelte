<script lang="ts">
	import { supabaseClient } from '$lib/db/client';
	import { onMount } from 'svelte';
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
		<h2 class="col-span-full">Current supply Information</h2>
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
	<br />
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2>Update supply information</h2>
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
				value={supply.name}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="unit">
				<span class="label-text">Supply unit of measurement</span>
			</label>
			<input
				type="text"
				name="unit"
				placeholder="Supply unit of measurement"
				class="input input-bordered "
				required
				value={supply.unit}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="threshold">
				<span class="label-text">Supply threshold value</span>
			</label>
			<input
				type="number"
				name="threshold"
				placeholder="Supply threshold value"
				class="input input-bordered "
				required
				value={supply.threshold}
			/>
		</div>
		<br />
		<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
		<br />
		{#if form?.error}
			<p class=" text-center text-error font-bold">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="text-center text-success font-bold">
				Supply information has been successfully updated
			</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
