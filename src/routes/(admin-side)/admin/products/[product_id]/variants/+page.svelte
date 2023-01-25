<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product } = data;
</script>

<main class="h-full p-4">
	<h1>Product variants of {product.name}</h1>
	<a href={`/admin/products/${product.id}/variants/add`} class="btn">Add product variant</a>
</main>
