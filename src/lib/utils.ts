const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-ph', { dateStyle: "full", timeStyle: "short" })

export const datetime_formatter = (date: string | null | undefined) =>
    date ? DATE_TIME_FORMAT.format(new Date(date)) : '-'


export const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:5173/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
};

export function display_property(object: any, property: string) {
    return object[property];
}