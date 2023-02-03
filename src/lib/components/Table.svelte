<script lang="ts">
	import PaginationControl from './PaginationControl.svelte';

	export let table_headers: string[];
</script>

<div class="flex-1 overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr class="sticky top-0">
				{#each table_headers as table_header}
					<th>{table_header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<slot />
		</tbody>
	</table>
</div>
<PaginationControl />
