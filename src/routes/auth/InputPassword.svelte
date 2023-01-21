<script lang="ts">
	export let password: string;
</script>

<div class="form-control w-full">
	<label for="" class="label">
		<span class="label-text">Password</span>
	</label>
	<input
		type="password"
		placeholder="Password"
		bind:value={password}
		class="input input-bordered w-full"
		required
	/>
</div>
