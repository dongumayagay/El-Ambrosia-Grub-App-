import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData())
    }
};