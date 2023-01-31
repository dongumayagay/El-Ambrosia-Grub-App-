<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { products } = data;
</script>

<div class="hero">
	<div class="hero-content text-center prose">
		<div class="max-w-md prose">
			<h1 class="text-5xl font-bold text-secondary">Products</h1>
			<p class="py-6">Savor the flavor in every bite!</p>
		</div>
	</div>
</div>

<div class="px-8 grid lg:grid-cols-2 gap-8 mx-auto">
	{#each products as product}<div class="card sm:card-side bg-base-100 shadow-xl">
			<figure class="aspect-square w-full sm:max-w-xs">
				<img class="object-cover h-full" src={product.image_url} alt={product.name} />
			</figure>
			<div class="card-body">
				<h2 class="card-title">{product.name}</h2>
				<p>{product.description}</p>
				<br />
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Listen</button>
				</div>
			</div>
		</div>{/each}
</div>
