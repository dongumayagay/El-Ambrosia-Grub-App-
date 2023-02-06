<script lang="ts">
	import cart from '$lib/stores/cart';
</script>

<input
	type="hidden"
	name="order_items"
	value={JSON.stringify(
		$cart.map((item) => ({
			variant_id: item.variant_id,
			quantity: item.quantity
		}))
	)}
/>
