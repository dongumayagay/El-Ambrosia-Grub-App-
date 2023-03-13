<script lang="ts">
	import { browser } from '$app/environment';
	import Map from './Map.svelte';
</script>

{#if browser}
	<Map />
{/if}
