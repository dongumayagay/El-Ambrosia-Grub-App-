<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let map_container: HTMLDivElement;

	onMount(() => {
		L.map(map_container)
			.setView([14.386682, 120.889359], 15)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
	});
</script>

<div id="map" bind:this={map_container} />

<style>
	#map {
		height: 500px;
	}
</style>
