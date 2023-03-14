<script lang="ts">
	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		const L = await import('leaflet');
		const map = L.map(map_container)
			.setView([14.386682, 120.889359], 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));
	}
</script>

<main use:setup />

<style>
	@import 'leaflet/dist/leaflet.css';
	main {
		height: 500px;
	}
</style>
