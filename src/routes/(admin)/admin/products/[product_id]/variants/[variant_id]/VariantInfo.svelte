<script lang="ts">
	// @ts-ignore
	import ProductName from '../../ProductName.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ProductName {data} />
<div class="grid">
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Variant name</span>
		</label>
		<input class="input input-bordered" readonly value={data.variant?.name} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Price</span>
		</label>
		<input class="input input-bordered" readonly value={data.variant?.price} />
	</div>
</div>
