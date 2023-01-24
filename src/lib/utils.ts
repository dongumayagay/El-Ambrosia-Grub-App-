const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-ph', { dateStyle: "full", timeStyle: "short" })

export const datetime_formatter = (date: string | null | undefined) =>
    date ? DATE_TIME_FORMAT.format(new Date(date)) : '-'