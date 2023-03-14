<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import { browser } from '$app/environment';

	let map_container: HTMLDivElement;
	let map: L.Map;
	let marker: L.Marker;

	onMount(() => {
		map = L.map(map_container, {})
			.setView([14.386682, 120.889359], 18)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

		map.on('click', (event) => {
			if (marker) {
				marker.setLatLng(event.latlng);
			} else {
				marker = L.marker(event.latlng).addTo(map);
			}
		});

		return () => map.remove();
	});

	async function addLocateControl() {
		if (browser) {
			await import('leaflet.locatecontrol');
			const lc = L.control.locate({ drawMarker: true }).addTo(map);
		}
	}

	$: if (browser) {
		addLocateControl();
	}
</script>

<div style="height:500px;" id="map" bind:this={map_container} />

<style>
	#map {
		height: 500px;
	}
</style>
