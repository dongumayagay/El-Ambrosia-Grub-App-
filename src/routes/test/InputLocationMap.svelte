<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let pos: { lat: number; lng: number };
	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		const L = await import('leaflet');
		await import('leaflet.locatecontrol');

		const BUSINESS_LOC = L.latLng([14.386682, 120.889359]);
		const map = L.map(map_container)
			.setView(BUSINESS_LOC, 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));
		L.control
			.locate({
				drawCircle: false,
				flyTo: true
			})
			.addTo(map);

		let marker: L.Marker;

		map.on('click', (e) => set_marker(e.latlng));
		map.on('locationfound', (e) => set_marker(e.latlng));

		function set_marker(latlng: L.LatLng) {
			if (marker) marker.setLatLng(latlng);
			else
				marker = L.marker(latlng, {
					icon: L.icon({
						iconUrl: markerIcon,
						shadowUrl: markerShadow,
						iconSize: [25, 41],
						iconAnchor: [13, 41]
					}),
					draggable: true
				}).addTo(map);
			const { lat, lng } = latlng;
			dispatch('set_location', { lat, lng });
		}
	}
</script>

<div use:setup />

<!--  -->
<style>
	div {
		height: 500px;
	}
</style>
