import { createClient, type TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const supabase = createClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY
)

export const ROLES_ALLOWED_IN_ADMIN: (string | null)[] = [
    'superadmin', 'admin', 'customer_support'
]


export async function getUserRole(supabaseClient: TypedSupabaseClient, uid: string) {
    const { data, error: supabase_error } = await supabaseClient.from('roles').select('role').limit(1).single()
    if (supabase_error) throw error(Number(supabase_error.code), supabase_error)
    return data?.role ?? null
}