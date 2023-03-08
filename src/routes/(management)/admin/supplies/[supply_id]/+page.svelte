<script lang="ts">
	import type { PageData } from './$types';
	import SupplyInfo from './SupplyInfo.svelte';

	export let data: PageData;
</script>

<SupplyInfo {data} />
