<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		const L = await import('leaflet');

		const EL_AMBROSIA_LOC = L.latLng([14.386682, 120.889359]);
		const map = L.map(map_container)
			.setView(EL_AMBROSIA_LOC, 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

		let marker: L.Marker | null = null;

		import('leaflet.locatecontrol').then(() => L.control.locate().addTo(map));

		map.on('click', (e) => set_marker(e.latlng));
		map.on('locationfound', (e) => set_marker(e.latlng));

		function set_marker(latlng: L.LatLng) {
			if (marker) marker.setLatLng(latlng);
			else
				marker = L.marker(latlng, {
					icon: L.icon({
						iconUrl: markerIcon,
						shadowUrl: markerShadow
					})
				}).addTo(map);
		}
	}
</script>

<main use:setup />

<style>
	main {
		height: 500px;
	}
</style>
