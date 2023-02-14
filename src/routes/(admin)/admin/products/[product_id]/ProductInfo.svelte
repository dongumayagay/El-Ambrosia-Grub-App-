<script lang="ts">
	// @ts-ignore
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid">
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Product name</span>
		</label>
		<input class="input input-bordered" readonly value={data.product?.name} />
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Product description</span>
		</label>
		<textarea
			cols="30"
			rows="5"
			class="textarea textarea-bordered"
			value={data.product?.description}
			readonly
		/>
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Product image</span>
		</label>
		<img src={data.product?.image_url} alt="" class="m-0 w-full sm:max-w-lg" />
	</div>
</div>
