<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import 'leaflet.locatecontrol';
	import { browser } from '$app/environment';

	// onMount(() => {
	// 	map = L.map(map_container, {})
	// 		.setView([14.386682, 120.889359], 18)
	// 		.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

	// 	map.on('click', (event) => {
	// 		if (marker) {
	// 			marker.setLatLng(event.latlng);
	// 		} else {
	// 			marker = L.marker(event.latlng).addTo(map);
	// 		}
	// 	});

	// 	return () => map.remove();
	// });

	function set_map(map_container: HTMLElement) {
		const map = L.map(map_container, {})
			.setView([14.386682, 120.889359], 18)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

		// map.on('click', (event) => {
		// 	if (marker) {
		// 		marker.setLatLng(event.latlng);
		// 	} else {
		// 		marker = L.marker(event.latlng).addTo(map);
		// 	}
		// });
	}

	// async function addLocateControl() {
	// 	if (browser) {
	// 		const lc = L.control.locate({ drawMarker: true }).addTo(map);
	// 	}
	// }

	// $: if (browser) {
	// 	addLocateControl();
	// }
</script>

<div style="height:500px;" use:set_map />
