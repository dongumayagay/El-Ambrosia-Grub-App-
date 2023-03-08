<script lang="ts">
	import { supabaseClient } from '$lib/db/client';

	let count: number;

	async function getData() {
		count =
			(await (await supabaseClient.from('profiles').select('id', { count: 'exact' })).count) ?? 0;
	}
	getData();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">Total Users</div>
		<div class="stat-value">{count ?? 'Counting...'}</div>
		<div class="stat-actions">
			<a href="/admin/accounts" class="btn btn-sm">View Accounts</a>
		</div>
	</div>
</div>
