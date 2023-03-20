<script lang="ts">
	import { getGMapLinkDirections, getWazeLinkDirections } from '$lib/misc/utils';
	import InputLocationMap from '../InputLocationMap.svelte';
	let pos: {
		lat: number;
		lng: number;
	};
</script>

<InputLocationMap
	on:set_location={(e) => {
		pos = e.detail;
	}}
/>

{#if pos}
	<a href={getGMapLinkDirections(pos.lat, pos.lng)} target="_blank">
		get directions using google maps
	</a>
	<a href={getWazeLinkDirections(pos.lat, pos.lng)} target="_blank"> get directions using waze </a>
{/if}
