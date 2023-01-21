<script lang="ts">
	import GoogleSignIn from './GoogleSignIn.svelte';
	import InputEmail from './InputEmail.svelte';
	import InputPassword from './InputPassword.svelte';
	import SubmitButton from './SubmitButton.svelte';

	export let form_title = 'form_title';
	export let button_text = 'button_text';
	export let auth_redirect = {
		name: 'Go to homepage',
		path: '/'
	};

	export let email: string = 'someone@email.com';
	export let password: string = 'HorkWfIsUtUUVqXJEOSw';

	export let loading: boolean;
	export let error_message: string;

	// async function handler() {
	// 	loading = true;

	// 	const { data: _, error: auth_error } = await submit_function({
	// 		email,
	// 		password
	// 	});
	// 	if (auth_error) {
	// 		console.log(auth_error);
	// 		error_message = auth_error.message;
	// 	}

	// 	loading = false;
	// }
</script>

<main class="flex flex-col w-full border-opacity-50 mx-auto max-w-md">
	<h1 class="font-bold text-center text-2xl uppercase">{form_title}</h1>
	<form on:submit|preventDefault>
		<InputEmail bind:email />
		<InputPassword bind:password />
		{#if error_message}
			<p class=" text-error">{error_message}</p>
		{/if}
		<SubmitButton {loading} {button_text} />
	</form>
	<div class="divider">OR</div>
	<GoogleSignIn />
	<a class="text-center pt-4 font-semibold" href={auth_redirect.path}>
		{auth_redirect.name}
	</a>
</main>
