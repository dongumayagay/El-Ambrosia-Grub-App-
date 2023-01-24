<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let supplies = data.supplies;
</script>

<main class="h-full">
	<a href="/admin/manage-supplies/create" class="btn">Add New supply</a>
	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>name</th>
					<th>value</th>
					<th>unit</th>
					<th>threshold</th>
					<!-- <th /> -->
				</tr>
			</thead>
			<tbody>
				{#each supplies as supply}
					<tr class="hover">
						<td>{supply.name}</td>
						<td>{supply.value}</td>
						<td>{supply.unit}</td>
						<td>{supply.threshold}</td>
						<!-- <td>
							<a class="btn" href={`/admin/manage-accounts/${user.id}`}>Details</a>
						</td> -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
