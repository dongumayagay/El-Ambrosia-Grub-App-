import '$lib/db/client'
import * as SentrySvelte from "@sentry/svelte"
import type { HandleClientError } from '@sveltejs/kit'


SentrySvelte.init({
    dsn: "https://a7825f84f03b4c3799bc969ec6db9133@o4504801773486080.ingest.sentry.io/4504801802977280"
})

export const handleError: HandleClientError = ({ error, event }) => {
    const error_id = crypto.randomUUID()
    SentrySvelte.captureException(error, {
        contexts: {
            sveltekit: { event, error_id }
        }
    })

    return {
        message: "An unexpected error occured. We're working on it!",
        error_id
    }
}