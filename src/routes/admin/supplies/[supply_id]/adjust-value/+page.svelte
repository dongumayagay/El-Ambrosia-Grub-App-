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
	<div class="grid sm:grid-cols-2 gap-4">
		<div class="form-control ">
			<label class="label" for=""> <span class="label-text">Name</span> </label>
			<input type="text" readonly class="input input-bordered cursor-text" value={supply.name} />
		</div>
		<div class="form-control ">
			<label class="label" for=""> <span class="label-text">Current value</span> </label>
			<input
				type="text"
				readonly
				class="input input-bordered cursor-text"
				value={`${supply.value} ${supply.unit}`}
			/>
		</div>
		<div class="form-control ">
			<label class="label" for=""> <span class="label-text">Threshold</span> </label>
			<input
				type="text"
				readonly
				class="input input-bordered cursor-text"
				value={`${supply.threshold} ${supply.unit}`}
			/>
		</div>
		<div class="form-control ">
			<label class="label" for=""> <span class="label-text">Unit of measurement</span> </label>
			<input type="text" readonly class="input input-bordered cursor-text" value={supply.unit} />
		</div>
	</div>
	<form method="post" class="grid" use:enhance={enhance_function}>
		<div class="form-control">
			<label class="label" for="">
				<span class="label-text">Adjust supply value</span>
			</label>
			<input type="number" name="amount" placeholder="Enter value" class="input input-bordered" />
			<label class="label" for="">
				<span class="label-text text-info">Will increase or decrease base on value adjusted by</span
				>
			</label>
		</div>
		<button class="btn btn-block" class:loading disabled={loading}>Adjust</button>
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
{:else}
	<NotFound />
{/if}
