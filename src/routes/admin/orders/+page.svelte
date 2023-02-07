<script lang="ts">
	import Table from '$lib/components/Table.svelte';
	import { Order_States, states } from '$lib/misc/constants';
	import { currency_formatter, datetime_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav class="flex justify-end">
	<form method="get">
		<div class="form-control">
			<label for="status" class="label">
				<span class="label-text">Filter order by status</span>
			</label>
			<div class="input-group">
				<select class="select select-bordered uppercase" name="status">
					<option disabled selected>select status</option>
					<option value="">all</option>
					{#each states as state, index}
						<option value={index}>{state}</option>
					{/each}
				</select>
				<button class="btn"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	</form>
</nav>
<Table table_headers={['order id', 'status', 'date ordered', 'total', 'owner id', '']}>
	{#each data.orders as order (order.id)}
		<tr class="hover">
			<td>{order.id}</td>
			<td> <span class="badge badge-lg uppercase"> {Order_States[order.status]} </span> </td>
			<td>{datetime_formatter(order.created_at)}</td>
			<td>{currency_formatter(order.total)}</td>
			<td>{order.owner_id}</td>
			<td><button class="btn btn-outline"> gawin mo to </button></td>
		</tr>
	{:else}
		<tr class="hover">
			<td colspan="6" class="text-center font-bold"> No result found </td>
		</tr>
	{/each}
</Table>
