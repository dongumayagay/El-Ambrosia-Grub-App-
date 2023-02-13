<script lang="ts">
	import { supabaseClient } from '$lib/db/client';
	import { Order_States } from '$lib/misc/constants';
	import { currency_formatter, getTodayDatetimeRange } from '$lib/misc/utils';

	let total: number;

	async function getData() {
		const range = getTodayDatetimeRange();
		const { data: completed_orders_today, error: err } = await supabaseClient
			.from('orders')
			.select('*')
			.gte('created_at', range.start)
			.lte('created_at', range.end)
			.eq('status', Order_States['completed']);
		if (err || completed_orders_today.length === 0) {
			total = 0;
			return;
		}
		if (completed_orders_today === null) {
			total = 0;
			return;
		}
		total = completed_orders_today.reduce((acc, order) => (acc += order.total), 0);
	}
	getData();
</script>

<div class="stats shadow">
	<div class="stat">
		<div class="stat-title">Sales today</div>
		<div class="stat-value">{total !== undefined ? currency_formatter(total) : 'Computing...'}</div>
		<div class="stat-actions">
			<a href="/admin/orders?status=5" class="btn btn-sm">View completed orders</a>
		</div>
	</div>
</div>
