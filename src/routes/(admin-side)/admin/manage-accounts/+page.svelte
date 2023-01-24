<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let users = data.users;
</script>

<main class="p-4 min-h-full">
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>User ID</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Created at</th>
					<th>Last sign in</th>
					<th />
				</tr>
			</thead>
			<tbody>
				<tr class="hover">
					{#each users as user}
						<td>{user.id}</td>
						<td>{user.email}</td>
						<td>{user.phone}</td>
						<td>{user.created_at}</td>
						<td>{user.last_sign_in_at}</td>
						<td>
							<a class="btn" href={`/admin/manage-accounts/${user.id}`}>Details</a>
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</main>
