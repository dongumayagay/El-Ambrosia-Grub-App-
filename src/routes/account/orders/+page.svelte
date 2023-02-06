<script lang="ts">
	import Table from '$lib/components/Table.svelte';
	import { Order_States } from '$lib/misc/constants';
	import { datetime_formatter } from '$lib/misc/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.orders}
	<header>
		<div class="prose mx-auto text-center">
			<h2>Your Orders</h2>
		</div>
	</header>

	<Table table_headers={['ID', 'Date Ordered', 'Total Quantity', 'Total Price', 'Status', '']}>
		{#each data.orders as order (order.id)}
			<tr>
				<td>{order.id} </td>
				<td>{datetime_formatter(order.created_at)}</td>
				<td>{order.total_quantity}</td>
				<td>₱{order.total}</td>
				<td>
					<span class="badge badge-lg uppercase">
						{Order_States[order.status]}
					</span>
				</td>
				<td
					><a href={`/account/orders/${order.id}`} class="btn btn-outline">View order details</a
					></td
				>
			</tr>
		{:else}
			<tr>
				<td colspan="41" class="text-center font-bold">
					<div class="prose text-center mx-auto">
						<h2>No Orders Yet</h2>
					</div>
					<br />
					<a href="/products" class="btn">Go to products</a>
				</td>
			</tr>
		{/each}
	</Table>
{/if}
