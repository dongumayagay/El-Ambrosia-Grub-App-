import type { Link } from "$lib/types/custom";
import { account_links } from "./constants";

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-ph', { dateStyle: "full", timeStyle: "short" })
const CURRENCY_FORMAT = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2, });

export const datetime_formatter = (date: string | null | undefined) =>
    date ? DATE_TIME_FORMAT.format(new Date(date)) : '-'

export const currency_formatter = (value: number) =>
    CURRENCY_FORMAT.format(value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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


export function get_account_links(provider: string): Link[] {
    if (provider !== 'email') return account_links
    return [...account_links,
    {
        name: "Change password",
        path: "/change-password",
    }]
}


export function getMapLinkDirections(longitude: number, latitude: number): string {
    const link = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    return link;
}
