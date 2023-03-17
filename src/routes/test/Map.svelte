<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		const L = await import('leaflet');
		await import('leaflet-routing-machine');
		await import('leaflet.locatecontrol');

		const BUSINESS_LOC = L.latLng([14.386682, 120.889359]);
		const map = L.map(map_container)
			.setView(BUSINESS_LOC, 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

		L.control.locate().addTo(map);

		let routing_control: ReturnType<typeof L.Routing.control> | undefined;

		map.on('click', (e) => set_marker(e.latlng));
		map.on('locationfound', (e) => set_marker(e.latlng));

		function set_marker(latlng: L.LatLng) {
			if (!routing_control) {
				routing_control = L.Routing.control({
					waypoints: [L.Routing.waypoint(BUSINESS_LOC), L.Routing.waypoint(latlng)]
				}).addTo(map);
			} else {
				routing_control.setWaypoints([
					L.Routing.waypoint(BUSINESS_LOC),
					L.Routing.waypoint(latlng)
				]);
			}
		}
	}
</script>

<main use:setup />

<!--  -->
<style>
	main {
		height: 500px;
	}
</style>
