<script lang="ts">
	import { goto } from '$app/navigation';
	import { currency_formatter } from '$lib/misc/utils';
	import cart from '$lib/stores/cart';
	import type { PageData } from './$types';

	export let data: PageData;

	function addToCart(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		try {
			const variant_id = Number(formData.get('variant_id')?.toString());
			const product = data.product;

			if (Number.isNaN(variant_id) && !product) throw Error;

			const variant = data.variants.find((item) => item.id === variant_id);
			if (!variant || !product) throw Error;

			cart.add({
				product_id: product.id,
				variant_id,
				image_url: product?.image_url ?? '',
				name: variant.name + ' ' + product?.name ?? '',
				price: variant.price,
				quantity: 1
			});
			goto('/bag');
		} catch (error) {
			alert('something when wrong');
		}
	}
</script>

{#if data.product && data.variants}
	<main class="py-32">
		<nav class=" w-full max-w-6xl mx-auto p-4">
			<button on:click={() => goto('/products')} class="btn btn-sm btn-secondary gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clip-rule="evenodd"
					/>
				</svg>
				Products
			</button>
		</nav>
		<div class="hero">
			<div class="hero-content w-full flex-col lg:flex-row gap-8 grid md:grid-cols-2 ">
				<img
					src={data.product.image_url}
					class="w-full rounded-lg shadow-2xl"
					alt={data.product.name}
				/>
				<div class="w-full">
					<h1 class="text-5xl font-bold">{data.product.name}</h1>
					<p class="py-6">
						{data.product.description}
					</p>
					<form on:submit|preventDefault={addToCart}>
						<div class="flex flex-col gap-4">
							<input type="hidden" name="product_id" value={data.product.id} />
							{#each data.variants as variant}
								<div>
									<input
										id={variant.name}
										value={variant.id}
										class="peer hidden"
										type="radio"
										name="variant_id"
										required
									/>
									<label
										for={variant.name}
										class="btn btn-outline btn-block peer-checked:outline outline-brand-red"
										>{variant.name} - {currency_formatter(variant.price)}
									</label>
								</div>
							{/each}
						</div>

						<br />
						<button class="btn btn-primary btn-block">Add to bag</button>
					</form>
					<br />
				</div>
			</div>
		</div>
	</main>
{/if}
