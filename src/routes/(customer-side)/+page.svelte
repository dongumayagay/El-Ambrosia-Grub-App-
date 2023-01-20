<script>
	import { page } from '$app/stores';
	import { supabase } from '$lib/db';

	async function register() {
		let { data, error } = await supabase.auth.signUp({
			email: 'someone@email.com',
			password: 'HorkWfIsUtUUVqXJEOSw'
		});
	}

	async function login() {
		let { data, error } = await supabase.auth.signInWithPassword({
			email: 'someone@email.com',
			password: 'HorkWfIsUtUUVqXJEOSw'
		});
	}

	async function logout() {
		let { error } = await supabase.auth.signOut();
	}
</script>

{#if !$page.data.session}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>I am logged in!</p>
{/if}

<hr />
<button on:click={register}>register</button>
<button on:click={login}>login</button>
<button on:click={logout}>logout</button>
