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
		<h2 class="uppercase">Register</h2>
	</div>
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
	<button class="btn btn-block" class:loading disabled={loading}>create my account</button>
	<br />
	{#if form?.error}
		<br />
		<p class="text-center text-error font-bold ">
			{form.error}
		</p>
	{/if}
	<br />
	<a class="text-center" href="/auth/login">Already have and account? Login</a>
</form>
