<script lang="ts">
	// @ts-ignore
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid">
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Variant of product</span>
		</label>
		<input class="input input-bordered" readonly value={data.product?.name} />
	</div>
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
