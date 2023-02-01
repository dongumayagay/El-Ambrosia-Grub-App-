<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean;

	const { product, variants, session } = data;
	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
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
				<form method="post" use:enhance={enhance_function}>
					<div class="flex flex-col gap-4">
						<input type="hidden" name="product_id" value={product.id} />
						{#each variants as variant}
							<div>
								<input
									id={variant.name}
									value={variant.id}
									class="peer hidden"
									type="radio"
									name="product_variant_id"
									required
								/>
								<label
									for={variant.name}
									class="btn btn-outline btn-block peer-checked:outline outline-brand-red"
									>{variant.name} - ₱{variant.price}
								</label>
							</div>
						{/each}
					</div>

					<br />
					<button class="btn btn-primary btn-block" disabled={!session || loading} class:loading
						>Add to cart</button
					>
				</form>
				<br />
				{#if form?.error}
					<br />
					<div class="alert alert-error shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							<span>{form.error}</span>
						</div>
					</div>
				{/if}
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
