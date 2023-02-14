<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1>Product variant: {data.variant?.name} {data.product?.name}</h1>
<slot />
