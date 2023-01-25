<script lang="ts">
	import { page } from '$app/stores';
	import { admin_links } from '$lib/constants';
	import { ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
	import { createEventDispatcher } from 'svelte';
	$: links =
		ROLES_ALLOWED_IN_ADMIN.includes($page.data.user_role) && $page.url.pathname.startsWith('/admin')
			? admin_links
			: [];
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
