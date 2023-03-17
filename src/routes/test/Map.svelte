<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';
	import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

	function setup(map_container: HTMLElement) {
		setup_map(map_container);
	}

	async function setup_map(map_container: HTMLElement) {
		// import leaflet dynamically since its a heavy library
		// const L = await import('leaflet');
		// await import('leaflet-routing-machine');
		const [L] = await Promise.all([
			import('leaflet'),
			import('leaflet-routing-machine'),
			import('leaflet.locatecontrol')
		]);
		// define RoutingControl type
		type RoutingControl = ReturnType<typeof L.Routing.control>;

		// business location
		const EL_AMBROSIA_LOC = L.latLng([14.386682, 120.889359]);

		// map init
		const map = L.map(map_container)
			.setView(EL_AMBROSIA_LOC, 19)
			.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }));

		// import and add locate control
		// import('leaflet.locatecontrol').then(() => L.control.locate().addTo(map));

		let marker: L.Marker | undefined;
		// let routing_control: RoutingControl | undefined;

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

			// after the adding the marker
			// draw route between EL_AMBROSIA_LOC to marker
			// if (!routing_control) {
			// 	// initialize routing control once the library has been loaded
			// 	routing_control = L.Routing.control({
			// 		waypoints: [L.Routing.waypoint(EL_AMBROSIA_LOC), L.Routing.waypoint(latlng)]
			// 		// routeWhileDragging: true,
			// 		// fitSelectedRoutes: false
			// 	}).addTo(map);
			// } else {
			// 	// update routing control waypoints
			// 	routing_control.setWaypoints([
			// 		L.Routing.waypoint(EL_AMBROSIA_LOC),
			// 		L.Routing.waypoint(latlng)
			// 	]);
			// }
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
