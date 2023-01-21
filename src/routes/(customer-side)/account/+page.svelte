<script lang="ts">
	import { supabase } from '$lib/db';

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

Account
<button on:click={logout} class="btn btn-secondary">Logout</button>
