/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Supabase {
		Database: import('$lib/types/schema').Database
		SchemaName: 'public'
	}

	interface Locals {
		user_role: string | null
	}
	interface PageData {
		session: import('@supabase/supabase-js').Session | null
		user_role: string | null
	}
	// interface Error {}
	// interface Platform {}
}
