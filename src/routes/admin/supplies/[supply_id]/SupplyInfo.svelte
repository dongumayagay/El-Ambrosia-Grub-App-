<script lang="ts">
	// @ts-ignore
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid sm:grid-cols-2 gap-4">
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Name</span> </label>
		<input
			type="text"
			readonly
			class="input input-bordered cursor-text"
			value={data.supply?.name}
		/>
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Current value</span> </label>
		<input
			type="text"
			readonly
			class="input input-bordered cursor-text"
			value={`${data.supply?.value} ${data.supply?.unit}`}
		/>
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Threshold</span> </label>
		<input
			type="text"
			readonly
			class="input input-bordered cursor-text"
			value={`${data.supply?.threshold} ${data.supply?.unit}`}
		/>
	</div>
	<div class="form-control ">
		<label class="label" for=""> <span class="label-text">Unit of measurement</span> </label>
		<input
			type="text"
			readonly
			class="input input-bordered cursor-text"
			value={data.supply?.unit}
		/>
	</div>
</div>
