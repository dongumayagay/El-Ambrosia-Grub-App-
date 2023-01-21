<script lang="ts">
	import { supabase } from '$lib/db';
	import AuthForm from '../AuthForm.svelte';
	import { page } from '$app/stores';

	const form_title = 'Register';
	const button_text = 'Create my account';
	const auth_redirect = {
		name: 'Already have an account? Login',
		path: $page.url.origin + '/auth/login'
	};
</script>

<AuthForm {form_title} {button_text} submit_function={supabase.auth.signUp} {auth_redirect} />
