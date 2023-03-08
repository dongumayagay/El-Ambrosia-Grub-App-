<div class="hero relative">
	<div class="custom-shape-divider-top-1678233782">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
				class="shape-fill"
			/>
		</svg>
	</div>
	<div class="custom-shape-divider-bottom-1678240174">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
				class="shape-fill"
			/>
		</svg>
	</div>
	<div class="hero-content flex-col sm:flex-row-reverse py-32">
		<section class="flex-1">
			<img
				src="/shawarma.webp"
				height="683"
				width="512"
				class="w-full rounded-lg shadow-2xl object-cover aspect-square"
				alt="shawarma"
				loading="lazy"
			/>
		</section>
		<div class="flex-1">
			<h1 class="text-5xl font-bold text-brand-red">Authentic Shawarma!</h1>
			<p class="py-6 text-brand-maroon">
				"An authentic shawarma is a symphony of flavors, with each ingredient perfectly balanced to
				create a savory and satisfying taste experience. Tender and juicy meats, crisp vegetables,
				and tangy sauces are all wrapped up in a soft and fluffy bread, creating a portable and
				delicious meal. Whether you prefer chicken, or steak, every bite is a tantalizing explosion
				of flavor that will leave you wanting more. So unwrap an authentic shawarma today and savor
				the taste of the Middle East!"
			</p>
			<a href="/products" class="btn btn-primary gap-2"
				>View Menu <svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 animate-side2side"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.custom-shape-divider-top-1678233782 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-top-1678233782 svg {
		position: relative;
		display: block;
		width: calc(135% + 1.3px);
		height: 150px;
		transform: rotateY(180deg);
	}

	.custom-shape-divider-top-1678233782 .shape-fill {
		fill: #a90003;
	}

	/** For tablet devices **/
	@media (min-width: 768px) and (max-width: 1023px) {
		.custom-shape-divider-top-1678233782 svg {
			width: calc(140% + 1.3px);
			height: 150px;
		}
	}

	/** For mobile devices **/
	@media (max-width: 767px) {
		.custom-shape-divider-top-1678233782 svg {
			width: calc(145% + 1.3px);
			height: 76px;
		}
	}

	.custom-shape-divider-bottom-1678240174 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.custom-shape-divider-bottom-1678240174 svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 150px;
	}

	.custom-shape-divider-bottom-1678240174 .shape-fill {
		fill: #a90003;
	}

	/** For tablet devices **/
	@media (min-width: 768px) and (max-width: 1023px) {
		.custom-shape-divider-bottom-1678240174 svg {
			width: calc(100% + 1.3px);
			height: 110px;
		}
	}

	/** For mobile devices **/
	@media (max-width: 767px) {
		.custom-shape-divider-bottom-1678240174 svg {
			width: calc(100% + 1.3px);
			height: 100px;
		}
	}
</style>
