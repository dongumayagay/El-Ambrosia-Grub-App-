<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a href="/admin/supplies/add" class="btn gap-2">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
		<path
			fill-rule="evenodd"
			d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
			clip-rule="evenodd"
		/>
	</svg>
	Add Delivery Location</a
>
<div class="flex-1 overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr class="sticky top-0">
				<th>name</th>
				<th>city</th>
				<th>province</th>
				<th>postal code</th>
				<th>fee</th>
				<th>status</th>
				<th>action</th>
			</tr>
		</thead>
		<tbody>
			{#each data.delivery_locations as delivery_location (delivery_location.id)}
				<tr class="hover">
					<td>{delivery_location.name}</td>
					<td> {delivery_location.city} </td>
					<td> {delivery_location.state} </td>
					<td> {delivery_location.postal_code} </td>
					<td> {delivery_location.fee} </td>
					<td> {delivery_location.enable} </td>
					<td>Action</td>
				</tr>
			{:else}
				<tr>
					<td colspan="7" class="text-center font-bold">
						<div class="prose text-center mx-auto">
							<h2>No delivery locations</h2>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="btn-group grid grid-cols-2">
	<button class="btn btn-outline">Previous page</button>
	<button class="btn btn-outline">Next</button>
</div>
