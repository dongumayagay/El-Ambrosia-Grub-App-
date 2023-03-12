<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';

	let loading: boolean;
	let image_preview: any;
	let pay_on_delivery_form_modal: boolean;

	function on_product_image_file_input_change(e: any) {
		image_preview = null;
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			if (e.target) image_preview = e.target.result;
		};
	}
	const enhance_function: SubmitFunction = () => {
		loading = true;
		return async ({ result, action, update }) => {
			// console.log(action.search);
			// if (result.type === 'redirect') {
			// 	goto(result.location);
			// }
			await update();
			loading = false;
			pay_on_delivery_form_modal = false;
		};
	};
</script>

<!-- pay on delivery -->
<label for="pay-on-delivery-form-modal" class="btn btn-block">Pay on delivery</label>
<input
	type="checkbox"
	id="pay-on-delivery-form-modal"
	class="modal-toggle"
	bind:checked={pay_on_delivery_form_modal}
/>
<label for="pay-on-delivery-form-modal" class="modal cursor-pointer">
	<form
		class="modal-box relative"
		action="?/pay_on_delivery"
		method="POST"
		use:enhance={enhance_function}
	>
		<h3 class="font-bold text-lg">Upload ID for order verification</h3>
		<div class="">
			<h2 class="font-semibold text-sm">Why need this?</h2>
			<p class=" text-xs">
				For pay on delivery orders, we require a valid form of identification for order verification
				purposes to ensure the security and legitimacy of our transactions. Your ID will be securely
				deleted once your order has been completed and will not be retained or shared with any third
				parties, except as required by law. If you choose to pay online, this requirement will not
				apply.
			</p>
		</div>
		<br />
		{#if image_preview}
			<img src={image_preview} alt="" class="m-0 w-full sm:max-w-lg" />
			<br />
		{/if}
		<div class="form-control">
			<input
				type="file"
				class="file-input file-input-bordered"
				accept="image/*"
				name="order_user_id_image"
				required
				on:change={on_product_image_file_input_change}
			/>
		</div>
		<div class="modal-action">
			<!-- <label for="pay-on-delivery-form-modal" class="btn btn-block">Proceed</label> -->
			<button type="submit" class="btn btn-block" class:loading disabled={loading}>Proceed</button>
		</div>
	</form>
</label>
