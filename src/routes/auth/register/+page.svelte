<script lang="ts">
	import { supabase } from '$lib/db';
	import AuthForm from '../AuthForm.svelte';
	import { page } from '$app/stores';

	let email: string;
	let password: string;

	let loading: boolean;
	let error_message: string;

	async function register() {
		loading = true;
		try {
			let { data: _, error: supabase_error } = await supabase.auth.signUp({
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
	on:submit={register}
	bind:email
	bind:password
	bind:loading
	bind:error_message
	form_title={'Register'}
	button_text={'Create my account'}
	auth_redirect={{
		name: 'Already have an account? Login',
		path: $page.url.origin + '/auth/login'
	}}
/>
