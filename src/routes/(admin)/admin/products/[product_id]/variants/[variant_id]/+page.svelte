<script lang="ts">
	import type { PageData } from './$types';
	import VariantInfo from './VariantInfo.svelte';

	export let data: PageData;
</script>

<VariantInfo {data} />
