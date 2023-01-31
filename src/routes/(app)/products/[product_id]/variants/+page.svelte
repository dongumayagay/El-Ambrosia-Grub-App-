<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { product, variants, session } = data;
</script>

{#if product && variants}
	<div class="hero py-32">
		<div class="hero-content w-full flex-col lg:flex-row gap-8 grid md:grid-cols-2 ">
			<img src={product.image_url} class="w-full rounded-lg shadow-2xl" alt={product.name} />
			<div class="w-full">
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
					<br />
					<button class="btn btn-primary btn-block" disabled={!session}>Add to cart</button>
				</form>
				<br />
				{#if !session}
					<div class="alert shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="stroke-info flex-shrink-0 w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							<span>You must be logged in to Add to Cart.</span>
						</div>
						<div class="flex-none">
							<a href="/auth/login" class="btn btn-sm">Login</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
