<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading: boolean;
	let pay_on_delivery_form_modal: boolean;

	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action, update }) => {
			// console.log(action.search);
			// if (result.type === 'redirect') {
			// 	goto(result.location);
			// }
			await update({ reset: false });
			loading = false;
			// pay_on_delivery_form_modal = false;
		};
	};

	function handleDigitsOnlyInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		const regex = /[^\d]/g;
		target.value = target.value.replace(regex, '');
	}

	$: if (!!$page.form?.error) {
		toast.error($page.form.error);
	}
</script>

<!-- pay on delivery -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	for="pay-on-delivery-form-modal"
	on:click|once={() => console.log('testing')}
	class="btn btn-block">Pay on delivery</label
>
<input
	type="checkbox"
	id="pay-on-delivery-form-modal"
	class="modal-toggle"
	bind:checked={pay_on_delivery_form_modal}
/>
<label for="pay-on-delivery-form-modal" class="modal cursor-pointer">
	<form
		class="modal-box relative"
		action="?/verify_otp"
		method="POST"
		use:enhance={enhance_function}
	>
		<h3 class="font-bold text-lg">something something</h3>
		<div class="form-control">
			<label class="label" for="">
				<span class="label-text">Enter OTP Code we have sent to your email</span>
			</label>
			<input
				type="text"
				placeholder="Type here"
				class="input input-bordered"
				maxlength="6"
				pattern={`[0-9]{6}`}
				on:input={handleDigitsOnlyInput}
				required
				name="code"
			/>
			<label class="label">
				<!-- <span class="label-text" />
				<span class="label-test"> -->
				<button class="btn btn-link mx-auto btn-xs">resend OTP code</button>
				<!-- </span> -->
			</label>
		</div>
		{#if form?.error}
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
					<span>Error! {form?.error}.</span>
				</div>
			</div>
			<br />
		{/if}

		<div class="modal-action mt-0">
			<!-- <label for="pay-on-delivery-form-modal" class="btn btn-block">Proceed</label> -->
			<button type="submit" class="btn btn-block" class:loading disabled={loading}>Verify</button>
		</div>
	</form>
</label>
