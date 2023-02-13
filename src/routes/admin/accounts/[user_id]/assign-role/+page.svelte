<script lang="ts">
	import { ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let submit_button: HTMLButtonElement;
</script>

<div class=" grid sm:grid-cols-2 gap-4">
	<div class="form-control col-span-full">
		<label class="label" for="">
			<span class="label-text">User ID</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.id} />
	</div>

	<div class="form-control col-span-full">
		<label class="label" for="">
			<span class="label-text">Email</span>
		</label>
		<input class="input input-bordered " readonly value={data.profile?.email_address} />
	</div>
	<form method="post" class="contents">
		<div class="form-control col-span-full">
			<label class="label" for="">
				<span class="label-text">Role</span>
			</label>
			<select
				name="role"
				class="select select-bordered"
				on:change={() => {
					submit_button.click();
				}}
			>
				<option value={null}>None</option>
				{#each ROLES_ALLOWED_IN_ADMIN as role}
					<option value={role} selected={role === data.roles?.position}
						>{role?.replaceAll('_', ' ')}</option
					>
				{/each}
			</select>
		</div>
		<button bind:this={submit_button} class="hidden" />
	</form>
</div>
{#if form?.success}
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
			<span>Changed role successfully</span>
		</div>
	</div>
{/if}
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
			<span>Error! something went wrong.</span>
		</div>
	</div>
{/if}
