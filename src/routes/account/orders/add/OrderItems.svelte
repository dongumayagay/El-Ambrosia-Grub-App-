<script lang="ts">
	import cart from '$lib/stores/cart';
</script>

<input
	type="hidden"
	name="order_items"
	value={JSON.stringify(
		$cart.map((item) => ({
            product_id:item.product_id,
			variant_id: item.variant_id,
			quantity: item.quantity,
			price: item.price,
			name: item.name
		}))
	)}
/>
