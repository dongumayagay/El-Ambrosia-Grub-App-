<script lang="ts">
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

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: location.href }
		});
		// console.log(location.href);
	}
</script>

{#if !$page.data.session}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>I am logged in!</p>
{/if}

<hr />
<button class="btn btn-primary" on:click={register}>register</button>
<button class="btn btn-secondary" on:click={login}>login</button>
<button class="btn btn-accent" on:click={logout}>logout</button>
<button class="btn btn" on:click={signInWithGoogle}>signInWithGoogle</button>
