<script lang="ts">
	import { supabaseClient } from '$lib/db/client';

	let lowSupplyItemCount: number;

	async function getLowSupplyItemCount() {
		const { data } = await supabaseClient.rpc('getLowSupplyItemCount');
		lowSupplyItemCount = data ?? 0;
	}
	getLowSupplyItemCount();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">Low supply items</div>
		<div class="stat-value">{lowSupplyItemCount ?? 'Counting...'}</div>
		<div class="stat-actions">
			<a href="/admin/supplies" class="btn btn-sm">view supplies</a>
		</div>
	</div>
</div>
