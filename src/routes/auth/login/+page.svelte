<script lang="ts">
	import { supabase } from '$lib/db';
	import AuthForm from '../AuthForm.svelte';
	import { page } from '$app/stores';

	const form_title = 'Login';
	const button_text = 'Sign me in';
	const auth_redirect = {
		name: "Don't have have and account? Create one",
		path: $page.url.origin + '/auth/register'
	};
</script>

<AuthForm
	{form_title}
	{button_text}
	submit_function={supabase.auth.signInWithPassword}
	{auth_redirect}
/>
