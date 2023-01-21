<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: if ($page.data.session) goto('/account');
</script>

<main class=" min-h-screen grid place-items-center">
	<slot />
</main>
