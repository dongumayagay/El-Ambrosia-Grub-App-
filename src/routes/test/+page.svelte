<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let map: L.Map;

	onMount(() => {
		map = L.map('map').setView([14.386682, 120.889359], 15);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
	});
</script>

<div id="map" />

<style>
	#map {
		height: 500px;
	}
</style>
