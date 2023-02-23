<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<h1 class="text-4xl font-bold">Reset you password</h1>
<p>Type in your email and we'll send you a link to reset your password</p>
<form method="post" class="grid">
	<div class="form-control ">
		<label class="label" for="">
			<span class="label-text">Email</span>
		</label>
		<input
			type="email"
			name="email"
			placeholder="you@example.com"
			class="input input-bordered "
			required
		/>
	</div>
	<br />
	<button class="btn"> send reset email</button>
</form>
{#if form?.error}
	<br />
	<div class="alert alert-error shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{form.error}</span>
		</div>
	</div>
{/if}
