<script lang="ts">
	import { admin_side_drawer } from '$lib/stores/app-state';
</script>

<label class="btn btn-square btn-ghost swap swap-rotate" for="admin-side-drawer">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" bind:checked={$admin_side_drawer} />

	<!-- hamburger icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		class="swap-off w-6 h-6"
	>
		<path
			fill-rule="evenodd"
			d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
			clip-rule="evenodd"
		/>
	</svg>

	<!-- close icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		class="swap-on w-6 h-6"
	>
		<path
			fill-rule="evenodd"
			d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
			clip-rule="evenodd"
		/>
	</svg>
</label>
