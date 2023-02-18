const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-ph', { dateStyle: "full", timeStyle: "short" })
const CURRENCY_FORMAT = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2, });

export const datetime_formatter = (date: string | null | undefined) =>
    date ? DATE_TIME_FORMAT.format(new Date(date)) : '-'

export const currency_formatter = (value: number) =>
    CURRENCY_FORMAT.format(value)

export function display_property(object: any, property: string) {
    return object[property];
}

export function generateBreadcrumbs(path: string): Array<{ name: string, url: string }> {
    const parts = path.split('/').filter(part => part);
    const breadcrumbs: Array<{ name: string, url: string }> = [];
    let breadcrumbUrl = '';

    for (const part of parts) {
        breadcrumbUrl += '/' + part;
        breadcrumbs.push({ name: part, url: breadcrumbUrl });
    }

    return breadcrumbs;
}

export function getTodayDatetimeRange(): { start: string, end: string } {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).toISOString();
    return { start: startOfToday, end: endOfToday };
}

export function getImageNameFromLink(link: string): string {
    const splitLink = link.split('/');
    const imageNameWithExtension = splitLink[splitLink.length - 1];
    const splitName = imageNameWithExtension.split('.');
    const imageName = splitName[0];
    const imageFormat = splitName[1];
    return `${imageName}.${imageFormat}`;
}