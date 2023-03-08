<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class=" flex-1 flex flex-col items-center justify-center">
	<div class="prose text-error">
		{#if $page.status === 404}
			<h1>You must be lost.</h1>
			<a class="link btn-link" href="/">Go to homepage</a>
		{:else}
			<h1>Well that was unexpected</h1>
			<p>Worry not, we're investigating this issue.</p>
		{/if}

		{#if $page.error?.error_id}
			<p>Error ID: {$page.error.error_id}</p>
		{/if}
	</div>
</div>
