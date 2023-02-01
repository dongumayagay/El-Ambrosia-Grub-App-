<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let users = data.users;
</script>

<div class="flex-1 overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr class="sticky top-0">
				<th>User ID</th>
				<th>Email</th>
				<th>Phone</th>
				<th>First name</th>
				<th>Last name</th>
				<th>actions</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user (user.id)}
				<tr class="hover">
					<td>{user.id}</td>
					<td>{user.email_address}</td>
					<td>{user.phone_number}</td>
					<td>{user.first_name}</td>
					<td>{user.last_name}</td>
					<td>
						<a class="btn" href={`/admin/accounts/${user.id}`}>Details</a>
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
