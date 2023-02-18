<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	let loading: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action }) => {
			if (result.type === 'redirect') {
				if (action.search === '?/pay_online') location.assign(result.location);
				else goto(result.location);
			}
			loading = false;
		};
	};
</script>

<form method="post" class="contents" action="?/pay_online" use:enhance={enhance_function}>
	<button class="btn btn-block" class:loading disabled={loading}>Pay Online</button>
</form>
