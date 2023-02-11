<script lang="ts">
	import cart from '$lib/stores/cart';
	import AccountButtons from './AccountButtons.svelte';

	const { total_quantity } = cart;
</script>

<div class="navbar sticky top-0 z-10 bg-brand-red">
	<div class="navbar-start">
		<slot name="navbar-start" />
	</div>
	<div class="navbar-center">
		<a href="/" class="">
			<img src="/brand-logo.png" alt="" class=" h-7" />
		</a>
	</div>
	<div class="navbar-end">
		<a href="/bag" class="btn btn-ghost btn-square text-brand-tan">
			<div class="indicator ">
				<span
					class="indicator-item indicator-bottom badge badge-sm badge-ghost rounded-full"
					class:hidden={$total_quantity === 0}
				>
					{$total_quantity}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</a>
		<!-- <div class="grid w-32 h-32 bg-base-300 place-items-center">content</div> -->
		<AccountButtons />
	</div>
</div>
