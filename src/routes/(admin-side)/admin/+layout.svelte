<script lang="ts">
	import { admin_side_drawer } from '$lib/stores/app-state';
</script>

<div class="drawer drawer-mobile">
	<input
		id="admin-side-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={$admin_side_drawer}
	/>
	<div class="drawer-content flex flex-col items-center justify-center">
		<!-- Page content here -->
	</div>
	<div class="drawer-side ">
		<label for="admin-side-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content border-r-2">
			<!-- Sidebar content here -->
			<li><a class="btn btn-ghost" href="/admin/manage-accounts">Manage accounts</a></li>
		</ul>
	</div>
</div>
