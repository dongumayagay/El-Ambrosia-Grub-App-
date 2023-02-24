<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	// export let data: PageData;
	export let form: ActionData;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action, update }) => {
			if (result.type === 'redirect') {
				await goto(result.location);
			}
			await update();
			loading = false;
		};
	};
</script>

<form method="post" use:enhance={enhance_function}>
	<br />
	<div class="prose text-center mx-auto"><h2>Change password</h2></div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Enter your new password</span>
		</label>
		<input
			type="password"
			placeholder="Password"
			class="input input-bordered"
			name="new_password"
			required
		/>
	</div>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}>Change password</button>
	<br />
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
	</div>{/if}
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
			<span>You change your password successfully!</span>
		</div>
	</div>{/if}
