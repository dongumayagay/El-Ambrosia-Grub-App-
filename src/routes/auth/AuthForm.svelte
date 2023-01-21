<script lang="ts">
	import type { AuthError, AuthResponse } from '@supabase/supabase-js';
	import GoogleSignIn from './GoogleSignIn.svelte';
	import InputEmail from './InputEmail.svelte';
	import InputPassword from './InputPassword.svelte';
	import SubmitButton from './SubmitButton.svelte';

	export let form_title = 'form_title';
	export let button_text = 'button_text';
	export let submit_function: (credentials: {
		email: string;
		password: string;
	}) => Promise<AuthResponse>;
	export let auth_redirect = {
		name: 'Go to homepage',
		path: '/'
	};

	let email: string;
	let password: string;

	let loading: boolean;
	let error_message: string;

	async function handler() {
		loading = true;

		const { data: _, error: auth_error } = await submit_function({ email, password });
		if (auth_error) {
			console.log(auth_error);
			error_message = auth_error.message;
		}

		loading = false;
	}
</script>

<div class="px-4 py-8">
	<h1 class="font-bold text-center text-2xl uppercase">{form_title}</h1>
	<main class="flex flex-col w-full border-opacity-50 mx-auto max-w-md">
		<form on:submit|preventDefault={handler}>
			<InputEmail bind:email />
			<InputPassword bind:password />
			<SubmitButton {button_text} />
		</form>
		<div class="divider">OR</div>
		<GoogleSignIn />
		<a class="text-center pt-4" href={auth_redirect.path}>
			{auth_redirect.name}
		</a>
	</main>
</div>
