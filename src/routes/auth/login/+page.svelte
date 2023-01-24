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

<main class=" h-full flex flex-col justify-center items-center">
	<h1 class="font-bold text-3xl uppercase">Login</h1>
	<form
		action="?/login"
		method="post"
		use:enhance={enhance_function}
		class="flex flex-col w-full max-w-sm"
	>
		<div class="form-control">
			<label class="label" for="email">
				<span class="label-text">Email Address</span>
			</label>
			<input type="email" name="email" placeholder="Email Address" class="input input-bordered" />
		</div>
		<div class="form-control">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" placeholder="Password" class="input input-bordered" />
		</div>
		<br />
		<button class="btn" class:loading>Sign me in</button>
		{#if form?.error}
			<br />
			<p class=" text-error font-bold text-center">
				{form.error}
			</p>
		{/if}
		<br />
		<a class="text-center" href="/auth/register">Don't have an account yet? Create one</a>
	</form>
</main>
