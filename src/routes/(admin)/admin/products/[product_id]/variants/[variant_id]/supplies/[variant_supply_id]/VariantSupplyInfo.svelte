<script lang="ts">
	import { display_property } from '$lib/misc/utils';

	// @ts-ignore
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid">
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Supply name</span>
		</label>
		<input
			class="input input-bordered"
			readonly
			value={display_property(data.variant_supply?.supplies, 'name')}
		/>
	</div>
	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Amount will use</span>
		</label>
		<input
			class="input input-bordered"
			readonly
			value={`${data.variant_supply?.amount_use} ${display_property(
				data.variant_supply?.supplies,
				'unit'
			)}`}
		/>
	</div>
</div>
