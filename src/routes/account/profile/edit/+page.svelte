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
		<!-- <div class="form-control">
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
		</div> -->

		<br />
		<button class="btn btn-block" class:loading disabled={loading}>Save update</button>
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
		{#if form?.success}
			<br />
			<div class="alert alert-success shadow-lg">
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Profile information updated successfully!</span>
				</div>
			</div>
		{/if}
	</form>
{:else}
	<NotFound />
{/if}
