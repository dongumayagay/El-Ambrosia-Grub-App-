<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import { browser } from '$app/environment';

	let map_container: HTMLDivElement;
	let map: L.Map;

	onMount(() => {
		map = L.map(map_container)
			.setView([14.386682, 120.889359], 15)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));

		return () => map.remove();
	});

	async function addLocateControl() {
		if (browser) {
			await import('leaflet.locatecontrol');
			L.control.locate().addTo(map);
		}
	}

	$: if (browser) {
		addLocateControl();
	}
</script>

<div id="map" bind:this={map_container} />

<style>
	#map {
		height: 500px;
	}
</style>
