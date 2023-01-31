<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product, variants } = data;
</script>

{#if product && variants}
	<div class="hero min-h-screen">
		<div class="hero-content flex-col lg:flex-row gap-8npm">
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
				<form method="post">
					<div class="flex flex-col gap-4">
						{#each variants as variant}
							<div>
								<input id={variant.name} class="peer hidden" type="radio" name="variant" />
								<label
									for={variant.name}
									class="btn btn-outline btn-block peer-checked:outline outline-brand-red"
									>{variant.name} - ₱{variant.price}
								</label>
							</div>
						{/each}
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
