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
			await update({ reset: false });
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
		<div class="form-control">
			<label class="label" for="email_address">
				<span class="label-text">Email address</span>
			</label>
			<input
				type="email"
				name="email_address"
				placeholder="Email address"
				class="input input-bordered "
				required
				value={profile.email_address}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="phone_number">
				<span class="label-text">Phone number</span>
			</label>
			<input
				type="tel"
				name="phone_number"
				placeholder="Phone number"
				class="input input-bordered "
				required
				value={profile.phone_number}
				pattern={String.raw`^(09|\+639)\d{9}$`}
				title="enter proper phone number"
			/>
		</div>

		<br />
		<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
		<br />
		{#if form?.error}
			<p class=" text-center text-error font-bold">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class=" text-center text-success font-bold">Profile information updated successfully</p>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
