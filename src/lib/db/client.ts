import { createClient, type TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const supabaseClient = createClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY
)

export const ROLES_ALLOWED_IN_ADMIN: (string | null)[] = [
    'superadmin', 'admin', 'customer_support'
]


export async function getUserRole(supabaseClient: TypedSupabaseClient, uid: string) {
    const { data, error: supabase_error } = await supabaseClient.from('roles').select('position').limit(1).single()
    if (supabase_error) {
        if (supabase_error.code = "PGRST116")
            return null
        throw error(500, JSON.stringify(supabase_error, null, 2))
    }
    return data?.position ?? null
}