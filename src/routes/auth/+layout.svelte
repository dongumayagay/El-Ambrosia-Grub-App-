<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: if ($page.data.session) goto('/account');
</script>

<main class="px-4 pt-32 grid place-items-center">
	<slot />
</main>
