<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { ROLES_ALLOWED_IN_ADMIN } from '$lib/db/client';
</script>

{#if $page.data.session}
	<main>
		<section class="dropdown dropdown-end dropdown-hover ">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-square btn-ghost text-brand-tan">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
						clip-rule="evenodd"
					/>
				</svg>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52 z-50	"
			>
				<li><a href="/account" class=""> Account</a></li>
				{#if ROLES_ALLOWED_IN_ADMIN.includes($page.data.user_role)}
					<li>
						<a href="/admin" class="">Admin</a>
					</li>
				{/if}

				<form class="contents" action="/logout" method="POST">
					<li>
						<button class="">Logout </button>
					</li>
				</form>
			</ul>
		</section>
	</main>
{:else}
	<main>
		<section class="dropdown dropdown-end dropdown-hover">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-square btn-ghost"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6 fill-accent"
				>
					<path
						fill-rule="evenodd"
						d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52 z-50	"
			>
				<li><a href="/register" class="">Register</a></li>
				<li><a href="/login" class="">Login</a></li>
			</ul>
		</section>
	</main>
{/if}
