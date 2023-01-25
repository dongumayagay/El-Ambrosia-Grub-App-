<script lang="ts">
	export let supply: {
		id: number;
		name: string;
		threshold: number;
		unit: string;
		value: number;
	};
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
			/>
		</svg>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li>
			<a class="btn btn-ghost" href={`/admin/supplies/${supply.id}/adjust-value`}>Adjust value</a>
		</li>
		<li>
			<a class="btn btn-ghost" href={`/admin/supplies/${supply.id}/edit`}>Update Info</a>
		</li>
		<!-- <li><a>Item 2</a></li> -->
	</ul>
</div>
