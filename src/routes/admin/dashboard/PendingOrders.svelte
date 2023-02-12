<script lang="ts">
	import { supabaseClient } from '$lib/db/client';

	let count: number;

	async function getData() {
		count =
			(await (
				await supabaseClient.from('orders').select('id', { count: 'exact' }).eq('status', 2)
			).count) ?? 0;
	}
	getData();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">Pending Orders</div>
		<div class="stat-value">{count ?? 'Checking...'}</div>
		<div class="stat-actions">
			<a href="/admin/orders" class="btn btn-sm">View orders</a>
		</div>
	</div>
</div>
