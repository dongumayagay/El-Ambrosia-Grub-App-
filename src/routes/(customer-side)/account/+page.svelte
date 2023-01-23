<script lang="ts">
	import { page } from '$app/stores';

	const user = $page.data.session?.user;
	const user_role = $page.data.role;
</script>

<div class="">
	{JSON.stringify(user, null, 2)}

	<hr />
	user role: {user_role}
</div>
