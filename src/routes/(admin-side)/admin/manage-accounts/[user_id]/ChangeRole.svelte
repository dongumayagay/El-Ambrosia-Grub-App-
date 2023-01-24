<script lang="ts">
	import { ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
	import type { ActionData } from './$types';
	export let form: ActionData;
	export let user_id: string;
</script>

<form action="?/change_role" method="post" class="form-control w-full max-w-xs">
	<input type="hidden" name="user_id" value={user_id} />
	<select name="new_role" class="select select-bordered" required>
		<option disabled selected value="">Select role to change into</option>
		<option value={null}>None</option>
		{#each ROLES_ALLOWED_IN_ADMIN as role}
			<option value={role}>{role?.replaceAll('_', ' ')}</option>
		{/each}
	</select>
	<button class="btn">Save updated role</button>
	{#if form?.success}
		<p class="text-success text-center">user role update successfully</p>
	{/if}
</form>
