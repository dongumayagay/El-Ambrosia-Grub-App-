<script lang="ts">
	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	function set_map(map_container: HTMLElement) {
		const map = L.map(map_container)
			.setView([14.386682, 120.889359], 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));
	}
</script>

<div style="height:500px;" use:set_map />
