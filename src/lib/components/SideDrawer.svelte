<script lang="ts">
	import { page } from '$app/stores';
	import { admin_links, account_links } from '$lib/misc/constants';
	// import { ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
	import { createEventDispatcher } from 'svelte';
	$: links = get_drawer_links($page.url.pathname);

	function get_drawer_links(pathname: string) {
		if (pathname.startsWith('/admin')) return admin_links;
		if (pathname.startsWith('/account')) return account_links;
		return [];
	}

	const dispatch = createEventDispatcher();
</script>

<ul class="menu p-4 w-80 bg-base-100 text-base-content border-2">
	<!-- Sidebar content here -->
	{#each links as link}
		<li>
			<a on:click={() => dispatch('close_drawer')} class="btn btn-ghost" href={link.path}
				>{link.name}</a
			>
		</li>
	{/each}
</ul>
