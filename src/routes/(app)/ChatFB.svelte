<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	onMount(() => {
		if (browser) {
			try {
				var chatbox = document.getElementById('fb-customer-chat');
				chatbox.setAttribute('page_id', '116061764725071');
				chatbox.setAttribute('attribution', 'biz_inbox');

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
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

<!-- Messenger Chat plugin Code -->
<div id="fb-root" />

<!-- Your Chat plugin code -->
<div id="fb-customer-chat" class="fb-customerchat" />
