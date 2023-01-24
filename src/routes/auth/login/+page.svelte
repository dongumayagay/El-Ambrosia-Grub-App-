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

<main>
	<h1>Login</h1>
	<form action="?/login" method="post" use:enhance={enhance_function}>
		<label for="">email</label>
		<input type="email" name="email" placeholder="email" />
		<label for="">password</label>
		<input type="password" name="password" placeholder="password" />
		<button class="btn" class:loading>Login</button>
		{#if form?.error}
			<p class=" text-error">
				{form.error}
			</p>
		{/if}
	</form>
</main>
