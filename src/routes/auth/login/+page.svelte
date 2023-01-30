<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	// export let data: PageData;
	export let form: ActionData;
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<form method="post" use:enhance={enhance_function} class="">
	<div class="prose">
		<h2 class="uppercase">Login</h2>
	</div>
	{#if form?.error}
		<br />
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
	<div class="form-control">
		<label class="label" for="email"> <span class="label-text">Email Address</span> </label>
		<input type="email" name="email" placeholder="Email Address" class="input input-bordered" />
	</div>
	<div class="form-control">
		<label class="label" for="password"> <span class="label-text">Password</span> </label>
		<input type="password" name="password" placeholder="Password" class="input input-bordered" />
	</div>
	<br />
	<button class="btn btn-block" class:loading disabled={loading}>Sign me in</button>
	<br />
	<br />
	<a class="text-center" href="/auth/register">Don't have an account yet? Create one</a>
</form>
