<script lang="ts">
	import type { PageData } from './$types';
	import VariantSupplyInfo from './VariantSupplyInfo.svelte';

	export let data: PageData;
</script>

<VariantSupplyInfo {data} />
