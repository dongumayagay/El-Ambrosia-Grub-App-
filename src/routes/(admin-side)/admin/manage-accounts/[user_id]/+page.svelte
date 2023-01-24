<script lang="ts">
	import { datetime_formatter } from '$lib/utils';
	import type { PageData } from './$types';
	import ChangeRole from './ChangeRole.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	export let data: PageData;
	const user = data.user_info;
</script>

<h1>User Information</h1>
<ul>
	<li>ID: {user.id}</li>
	<li>Email: {user.email}</li>
	<li>Phone: {user.phone || 'None'}</li>
	<li>Created at: {datetime_formatter(user.created_at)}</li>
	<li>Last sign in: {datetime_formatter(user.last_sign_in_at)}</li>
	<li>First name: {user.first_name}</li>
	<li>Last name: {user.last_name}</li>
	<li>Role: {user.role}</li>
</ul>
<ChangeRole {form} user_id={user.id ?? ''} />
