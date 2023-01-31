<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { products } = data;
</script>

<div class="hero">
	<div class="hero-content text-center prose">
		<div class="max-w-md">
			<h2 class="text-5xl font-bold text-secondary">Products</h2>
			<p class="">Savor the flavor in every bite!</p>
			<br />
		</div>
	</div>
</div>

<main class="pb-24">
	<div class="px-4 grid  lg:grid-cols-2 gap-8 mx-auto w-full max-w-7xl">
		{#each products as product}<div class="card sm:card-side bg-base-100 shadow-xl">
				<figure class="aspect-square w-full sm:max-w-xs">
					<img
						class="object-cover h-full aspect-square"
						src={product.image_url}
						alt={product.name}
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title text-primary">{product.name}</h2>
					<p>{product.description}</p>
					<br />
					<div class="card-actions justify-end">
						<a
							href={`/products/${product.id}/variants`}
							class="btn btn-primary btn-block sm:btn-wide">buy</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
