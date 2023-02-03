<script lang="ts">
	// @ts-nocheck
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	if (!dev) {
		onMount(() => {
			window.fbAsyncInit = function () {
				FB.init({
					xfbml: true,
					version: 'v16.0'
				});
			};

			(function (d, s, id) {
				var js,
					fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');
		});
	}
</script>

{#if !dev}
	<!-- Messenger Chat plugin Code -->
	<div id="fb-root" />

	<!-- Your Chat plugin code -->
	<div
		id="fb-customer-chat"
		class="fb-customerchat"
		page_id={'116061764725071'}
		attribution={'biz_inbox'}
	/>

	<svelte:element this="script" />
{/if}
