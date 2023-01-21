<script lang="ts">
	export let email: string;
</script>

<div class="form-control w-full">
	<label for="" class="label">
		<span class="label-text">Email Address</span>
	</label>
	<input
		type="email"
		placeholder="Email Address"
		bind:value={email}
		class="input input-bordered w-full"
		required
	/>
</div>
