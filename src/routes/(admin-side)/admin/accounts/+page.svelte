<script lang="ts">
	import { supabase } from '$lib/db';
	import { page } from '$app/stores';

	let loadedData:
		| {
				id: string;
				role: string | null;
		  }[]
		| null;

	async function loadData() {
		const { data } = await supabase.from('roles').select('*').limit(20);
		loadedData = data ?? [];
	}

	$: if ($page.data.session) {
		loadData();
	}
</script>

{$page.data.session}
{#if $page.data.session}
	<p>client-side data fetching with RLS</p>
	<!-- <pre>{JSON.stringify(loadedData, null, 2)}</pre> -->
	{#if !loadedData}
		Loading
	{:else}
		{#each loadedData as item}
			{item.id}
		{/each}
	{/if}
{/if}
