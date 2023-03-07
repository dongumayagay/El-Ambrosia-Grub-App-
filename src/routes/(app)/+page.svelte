<script>
	import About from './About.svelte';
</script>

<div class="hero ">
	<img src={'/new_banner.png'} alt="" class="mx-auto " height="1280" width="800" />
	<!-- <div class="hero min-h-screen" style={`background-image: url(${'./banner.jpg'});`}> -->
	<!-- <div class="hero-overlay bg-opacity-50" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-xl ">
			<div class="prose">
				<h1 class="mb-5 text-5xl font-bold text-brand-tan">El Ambrosia</h1>
				<p class="mb-5 	text-white">
					At El Ambrosia, we take pride in making each shawarma with care and authenticity, using
					traditional recipes and cooking techniques passed down from generations.
					

					So unwrap a world of flavor today and discover the authentic taste of shawarma at El
					Ambrosia.
				</p>
			</div>
			<a href="/products" class="btn btn-primary gap-2"
				>see products <svg
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
	</div> -->
</div>
<br />
<div class="hero py-24">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<img
			src="/shawarma.jpg"
			height="751"
			width="576"
			class="w-full max-w-xl rounded-lg shadow-2xl"
			alt="shawarma"
		/>
		<div>
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
				>View Products <svg
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
<About />
