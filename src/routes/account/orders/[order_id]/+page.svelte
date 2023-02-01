<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<pre class=" prose">
{JSON.stringify(data.order, null, 2)}
</pre>

<pre class=" prose">
{JSON.stringify(data.order_items, null, 2)}
</pre>
