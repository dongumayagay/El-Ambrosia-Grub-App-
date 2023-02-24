<script lang="ts">
	import { page } from '$app/stores';
	import { admin_links } from '$lib/misc/constants';
	import { get_account_links } from '$lib/misc/utils';

	import { createEventDispatcher } from 'svelte';
	$: links = get_drawer_links($page.url.pathname);

	function get_drawer_links(pathname: string) {
		if (pathname.startsWith('/admin')) return admin_links;
		if (pathname.startsWith('/account'))
			return get_account_links($page.data.session?.user.app_metadata.provider ?? '');
		return [];
	}

	const dispatch = createEventDispatcher();
</script>

<ul class="menu menu-compact p-4 gap-2 w-64 bg-base-100 text-base-content border-2">
	<!-- Sidebar content here -->
	{#each links as link}
		<li>
			<a
				on:click={() => dispatch('close_drawer')}
				class="capitalize "
				class:active={$page.url.pathname.startsWith(link.path)}
				href={link.path}>{link.name}</a
			>
		</li>
	{/each}
</ul>
