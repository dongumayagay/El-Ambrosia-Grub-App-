<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

	const EL_AMBROSIA_LOC = L.latLng([14.386682, 120.889359]);

	function setup_map(map_container: HTMLElement) {
		// setup map and marker
		const map = L.map(map_container)
			.setView(EL_AMBROSIA_LOC, 18)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));
		let marker: L.Marker | null = null;

		// add location control button
		import('leaflet.locatecontrol').then(() => L.control.locate().addTo(map));

		// event listeners
		map.on('click', (e) => set_marker(map, marker, e.latlng));
		map.on('locationfound', (e) => set_marker(map, marker, e.latlng));

		return { destroy: () => map.remove() };
	}

	function set_marker(map: L.Map, marker: L.Marker | null, latlng: L.LatLng) {
		if (marker) marker.setLatLng(latlng);
		else marker = L.marker(latlng).addTo(map);
	}
</script>

<div style="height:500px;" id="map" use:setup_map />
