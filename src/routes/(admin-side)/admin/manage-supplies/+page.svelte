<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let supplies = data.supplies;
</script>

<main class="min-h-full">
	<div class="overflow-x-auto">
		<table class="table">
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
				<tr class="hover">
					{#each supplies as supply}
						<td>{supply.name}</td>
						<td>{supply.value}</td>
						<td>{supply.unit}</td>
						<td>{supply.threshold}</td>
						<!-- <td>
							<a class="btn" href={`/admin/manage-accounts/${user.id}`}>Details</a>
						</td> -->
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</main>
