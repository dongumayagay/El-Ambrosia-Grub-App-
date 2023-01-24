<!-- <script lang="ts">
	import { supabase } from '$lib/db';
	import AuthForm from '../AuthForm.svelte';
	import { page } from '$app/stores';

	let email: string;
	let password: string;

	let loading: boolean;
	let error_message: string;

	async function login() {
		loading = true;
		try {
			let { data: _, error: supabase_error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (supabase_error) {
				error_message = supabase_error.message;
				throw supabase_error;
			}
		} catch (error) {
			console.log(error);
		}
		loading = false;
	}
</script>

<AuthForm
	on:submit={login}
	bind:email
	bind:password
	bind:loading
	bind:error_message
	form_title={'Login'}
	button_text={'Sign me in'}
	auth_redirect={{
		name: "Don't have have and account? Create one",
		path: $page.url.origin + '/auth/register'
	}}
/> -->

<main>
	<h1>Login</h1>
	<form action="?/login" method="post">
		<label for="">email</label>
		<input type="email" name="email" placeholder="email" />
		<label for="">password</label>
		<input type="password" name="password" placeholder="password" />
		<button>Login</button>
	</form>
</main>
