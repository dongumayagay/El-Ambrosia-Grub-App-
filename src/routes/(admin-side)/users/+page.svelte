<script lang="ts">
	import { supabase } from '$lib/db';
	import { page } from '$app/stores';

	let loadedData: any[] = [];
	async function loadData() {
		const { data } = await supabase.from('roles').select('*').limit(20);
		loadedData = data ?? [];
	}

	$: if ($page.data.session) {
		loadData();
	}
</script>

test
{$page.data.session}
{#if $page.data.session}
	<p>client-side data fetching with RLS</p>
	<pre>{JSON.stringify(loadedData, null, 2)}</pre>
{/if}
