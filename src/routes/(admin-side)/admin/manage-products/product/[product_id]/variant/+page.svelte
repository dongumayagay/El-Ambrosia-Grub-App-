<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product } = data;
</script>

<main class="h-full p-4">
	<div>
		<h1 class="text-xl">Product</h1>
		<h1 class="text-xl">Name: {product.name}</h1>
		<p class="text-xl">Description: {product.description}</p>
	</div>
</main>
