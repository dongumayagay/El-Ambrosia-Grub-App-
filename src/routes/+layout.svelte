<script lang="ts">
	import { supabase } from '$lib/db';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import TopNavigationBar from '$lib/components/navbar/TopNavigationBar.svelte';
	import { page } from '$app/stores';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	$: if (
		($page.url.pathname.startsWith('/account') || $page.url.pathname.startsWith('/account')) &&
		!$page.data.session
	) {
		goto('/auth/login');
	}
</script>

<svelte:head>
	<title>El Ambrosia</title>
</svelte:head>

<main class="min-h-screen">
	<TopNavigationBar />
	<slot />
</main>
