import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const data = await request.formData()
        const new_role = data.get('role')?.toString()
        console.log(new_role)
        const { error: err } = await locals.supabaseClient.from('roles').upsert({ id: params.user_id, position: new_role })
        if (err) return fail(500, { error: JSON.stringify(err) })
        return { success: true }
    }
};