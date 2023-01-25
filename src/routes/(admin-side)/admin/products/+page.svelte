<script lang="ts">
	import type { PageData } from './$types';
	// import { supabaseClient } from '$lib/db/client';
	// import { onMount } from 'svelte';

	export let data: PageData;
	let products = data.products;

	// onMount(() => {
	// 	const products_realtime_listener = supabaseClient
	// 		.channel('products-channel')
	// 		.on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
	// 			console.log('Change received!', payload);
	// 			if (payload.eventType === 'INSERT') {
	// 				// @ts-ignore
	// 				products = [...products, payload.new];
	// 			}
	// 			if (payload.eventType === 'UPDATE') {
	// 				// @ts-ignore
	// 				products = products.map((supply) => {
	// 					if (supply.id === payload.new.id) return payload.new;
	// 					return supply;
	// 				});
	// 			}
	// 			if (payload.eventType === 'DELETE') {
	// 				// @ts-ignore
	// 				products = products.filter((supply) => supply.id !== payload.old.id);
	// 			}
	// 		})
	// 		.subscribe();
	// 	return () => {
	// 		products_realtime_listener.unsubscribe();
	// 	};
	// });
</script>

<main class="h-full">
	<br />
	<div class="flex justify-between px-4">
		<a href="/admin/manage-products/product/add" class="btn  gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
			Add New Product</a
		>
	</div>
	<br />
	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>name</th>
					<th>description</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each products as product (product.id)}
					<tr class="hover">
						<td>{product.name}</td>
						<td>
							{product.description}
						</td>
						<td>
							<a class="btn gap-2" href={`/admin/manage-products/product/${product.id}/variants`}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6"
								>
									<path
										d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
									/>
									<path
										d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
									/>
								</svg>
								Edit</a
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
