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
		<div class="alert alert-success shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Role update successfully!</span>
			</div>
		</div>
	{/if}
</form>
