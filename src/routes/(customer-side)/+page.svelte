<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/db';

	async function register() {
		let { data, error } = await supabase.auth.signUp({
			email: 'someone@emai.com',
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
	}

	let loadedData: any[] = [];
	async function loadData() {
		const { data } = await supabase.from('roles').select('*').limit(20);
		loadedData = data ?? [];
	}

	$: if ($page.data.session) {
		loadData();
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
<button class="btn" on:click={signInWithGoogle}>signInWithGoogle</button>

{#if $page.data.session}
	<p>client-side data fetching with RLS</p>
	<pre>{JSON.stringify(loadedData, null, 2)}</pre>
{/if}
