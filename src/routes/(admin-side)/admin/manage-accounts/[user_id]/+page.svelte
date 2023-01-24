<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user_info;
</script>

<pre>{JSON.stringify(user, null, 2)}</pre>
