<script lang="ts">
	import AccountButtons from './AccountButtons.svelte';
</script>

<div class="navbar stickly top-0 z-10 bg-brand-red">
	<div class="navbar-start">
		<slot name="navbar-start" />
	</div>
	<div class="navbar-center">
		<a href="/" class="">
			<img src="/brand-logo.png" alt="" class=" h-8" />
		</a>
	</div>
	<div class="navbar-end">
		<AccountButtons />
	</div>
</div>
