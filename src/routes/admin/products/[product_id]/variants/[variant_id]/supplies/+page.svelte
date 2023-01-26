<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product, variant } = data;
</script>

{#if product && variant}
	<br />
	<div class="px-4">
		<h1 class="text-xl">{product.name} {variant.name} supplies will consume</h1>
		<br />
		<a href={`/admin/products/${product.id}/variants/${variant.id}/supplies/add`} class="btn gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
			Add supplies will consume</a
		>
	</div>
{/if}
