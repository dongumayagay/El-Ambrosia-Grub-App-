<script lang="ts">
	import type { PageData } from './$types';
	import ActionMenu from './ActionMenu.svelte';
	export let data: PageData;
	let products = data.products;
</script>

<a href="/admin/products/add" class="btn gap-2">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
		<path
			fill-rule="evenodd"
			d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
			clip-rule="evenodd"
		/>
	</svg>
	Add New Product</a
>
<div class="flex-1 overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr class="sticky top-0">
				<th>name</th>
				<th>description</th>
				<th>actions</th>
			</tr>
		</thead>
		<tbody>
			{#each products as product (product.id)}
				<tr class="hover">
					<td>{product.name}</td>
					<td>
						{product.description}
					</td>
					<td>
						<ActionMenu id={product.id} />
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
