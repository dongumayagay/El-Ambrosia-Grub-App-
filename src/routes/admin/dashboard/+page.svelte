<script lang="ts">
	// import type { PageData } from './$types';

	import LowSupplyItems from './LowSupplyItems.svelte';
	import PendingOrders from './PendingOrders.svelte';
	import SalesToday from './SalesToday.svelte';
	import TotalUsers from './TotalUsers.svelte';

	// export let data: PageData;
</script>

<main class="grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
	<LowSupplyItems />
	<PendingOrders />
<SalesToday></SalesToday>
	<TotalUsers />
</main>
