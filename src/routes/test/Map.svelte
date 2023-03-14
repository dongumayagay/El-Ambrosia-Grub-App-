<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		const L = await import('leaflet');

		const EL_AMBROSIA_LOC = L.latLng([14.386682, 120.889359]);

		const map = L.map(map_container)
			.setView(EL_AMBROSIA_LOC, 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));
		// let marker: L.Marker | null = null;

		import('leaflet.locatecontrol').then(() => L.control.locate().addTo(map));
	}
</script>

<main use:setup />

<style>
	main {
		height: 500px;
	}
</style>
