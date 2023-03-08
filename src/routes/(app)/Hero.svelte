<div class="relative h-[95vh] flex flex-col justify-center">
	<div class="custom-shape-divider-bottom-1678233035">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
				class="shape-fill"
			/>
		</svg>
	</div>
	<div
		class="w-full max-w-7xl flex flex-col px-4 pb-20 sm:flex-row absolute left-1/2 -translate-x-1/2"
	>
		<div class="flex-1">
			<img
				src={'./shawarma-destructure.png'}
				alt=""
				class="w-full max-w-xl drop-shadow-xl shadow-black"
			/>
		</div>
		<div class="flex-1 flex flex-col justify-center">
			<h1 class="text-5xl font-bold text-brand-red text-center">El Ambrosia</h1>
			<h1 class="text-brand-red text-center py-2">❝Authentic Shawarma❞</h1>
			<br class="hidden sm:block" />
			<p class=" text-brand-maroon">
				At El Ambrosia, we take pride in making each shawarma with care and authenticity, using
				traditional recipes and cooking techniques passed down from generations. So unwrap a world
				of flavor today and discover the authentic taste of shawarma at El Ambrosia.
			</p>
			<br />
			<div class="flex justify-between">
				<a href="/products" class="btn btn-primary gap-2"
					>See Products <svg
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
				<div class="flex gap-2 items-center text-green-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-10 h-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
						/>
					</svg>
					<div>
						<p>Brgy. Navarro,</p>
						<p>Gen. Trias, Cavite</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.custom-shape-divider-bottom-1678233035 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}

	.custom-shape-divider-bottom-1678233035 svg {
		position: relative;
		display: block;
		width: calc(250% + 1.3px);
		height: 250px;
		transform: rotateY(180deg);
	}

	.custom-shape-divider-bottom-1678233035 .shape-fill {
		fill: #a90003;
	}

	/** For tablet devices **/
	@media (min-width: 768px) and (max-width: 1023px) {
		.custom-shape-divider-bottom-1678233035 svg {
			width: calc(300% + 1.3px);
			height: 500px;
		}
	}

	/** For mobile devices **/
	@media (max-width: 767px) {
		.custom-shape-divider-bottom-1678233035 svg {
			width: calc(215% + 1.3px);
			height: 150px;
		}
	}
</style>
