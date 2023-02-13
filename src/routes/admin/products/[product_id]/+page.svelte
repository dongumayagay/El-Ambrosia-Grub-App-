<script lang="ts">
	import type { PageData } from './$types';
	import ProductInfo from './ProductInfo.svelte';

	export let data: PageData;
</script>

<ProductInfo {data} />
