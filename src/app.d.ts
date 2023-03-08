/// <reference types="@sveltejs/kit" />

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import type { Session } from '@supabase/supabase-js'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Supabase {
			Database: import('$lib/types/schema').Database
			SchemaName: 'public'
		}

		interface Locals {
			supabaseClient: TypedSupabaseClient
			supabaseAdmin: TypedSupabaseClient
			session: Session | null
			user_role: string | null
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null
			user_role: string | null
		}
		interface Error {
			error_id?: string
		}
		// interface Platform {}
	}
}