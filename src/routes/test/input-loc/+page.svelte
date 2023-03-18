<script lang="ts">
	import { getMapLinkDirections } from '$lib/misc/utils';
	import InputLocationMap from '../InputLocationMap.svelte';
	let pos: {
		lat: number;
		lng: number;
	};
</script>

<!-- getMapLinkDirections -->
<InputLocationMap
	on:set_location={(e) => {
		pos = e.detail;
	}}
/>

{#if pos}
	<a href={getMapLinkDirections(pos.lng, pos.lat)} target="_blank">get directions</a>
{/if}
