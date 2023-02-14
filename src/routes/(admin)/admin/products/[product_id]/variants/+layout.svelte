<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="grid">
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Variant of product</span>
		</label>
		<input class="input input-bordered" readonly value={data.product?.name} />
	</div>
</div>
<slot />
