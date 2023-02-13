<script lang="ts">
	import PaginationControl from './PaginationControl.svelte';

	export let table_headers: string[];
</script>

<div class="flex-1 overflow-x-auto">
	<table class="table w-full table-compact ">
		<thead>
			<tr class="sticky top-0 ">
				{#each table_headers as table_header}
					<td class=" bg-brand-tan">{table_header}</td>
				{/each}
			</tr>
		</thead>
		<tbody>
			<slot />
		</tbody>
	</table>
</div>
<PaginationControl />
