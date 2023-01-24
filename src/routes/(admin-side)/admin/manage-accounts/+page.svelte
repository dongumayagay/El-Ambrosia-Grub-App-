<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let users = data.users;
</script>

{#each users as user}
	<div>
		<pre>

		{JSON.stringify(user, null, 2)}
	</pre>
	</div>
{/each}
