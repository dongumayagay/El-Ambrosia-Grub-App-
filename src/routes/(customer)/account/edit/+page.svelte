<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import NotFound from '$lib/components/NotFound.svelte';

	export let data: PageData;
	export let form: ActionData;
	const { profile } = data;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

{#if profile}
	<form method="post" class="w-full max-w-md prose" use:enhance={enhance_function}>
		<h2>Update profile information</h2>
		<div class="form-control">
			<label class="label" for="first_name">
				<span class="label-text">First name</span>
			</label>
			<input
				type="text"
				name="first_name"
				placeholder="First name"
				class="input input-bordered "
				required
				value={profile.first_name}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="last_name">
				<span class="label-text">Last name</span>
			</label>
			<input
				type="text"
				name="last_name"
				placeholder="Last name"
				class="input input-bordered "
				required
				value={profile.last_name}
			/>
		</div>

		<br />
		<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
		<!-- <br />
	{#if form?.error}
		<p class=" text-center text-error font-bold">{form.error}</p>
	{/if} -->
	</form>
{:else}
	<NotFound />
{/if}
