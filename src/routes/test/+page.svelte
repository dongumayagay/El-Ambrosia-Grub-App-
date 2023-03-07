<script lang="ts">
	import { send_email } from '$lib/misc/utils';
	// import type { PageData } from './$types';

	// export let data: PageData;

	async function clickHandler() {
		console.log(
			await send_email({ to: 'dngumayagay@gmail.com', subject: 'Subject', html: `hello world` })
		);
	}
</script>

<button class="btn" on:click={clickHandler}>test</button>
