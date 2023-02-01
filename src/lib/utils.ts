const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-ph', { dateStyle: "full", timeStyle: "short" })

export const datetime_formatter = (date: string | null | undefined) =>
    date ? DATE_TIME_FORMAT.format(new Date(date)) : '-'

export function display_property(object: any, property: string) {
    return object[property];
}