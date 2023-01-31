<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product, variants } = data;
</script>

{#if product && variants}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content flex-col lg:flex-row">
			<img
				src={product.image_url}
				class="w-full max-w-xl rounded-lg shadow-2xl"
				alt={product.name}
			/>
			<div>
				<h1 class="text-5xl font-bold">{product.name}</h1>
				<p class="py-6">
					{product.description}
				</p>
			</div>
		</div>
	</div>
{/if}
