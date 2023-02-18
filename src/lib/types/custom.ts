export type Link = {
    name: string
    path: string
}

export interface InvoiceRequest {
    external_id: string;
    amount: number;
    description: string;
    invoice_duration: number;
    customer: Customer;
    customer_notification_preference: CustomerNotificationPreference;
    success_redirect_url: string;
    failure_redirect_url: string;
    currency: string;
    items?: (ItemsEntity)[] | null;
    fees?: (FeesEntity)[] | null;
}
export interface Customer {
    given_names: string;
    surname: string;
    email: string;
    mobile_number: string;
    addresses?: (AddressesEntity)[] | null;
}
export interface AddressesEntity {
    city: string;
    country: string;
    postal_code: string;
    state: string;
    street_line1: string;
    street_line2: string;
}
export interface CustomerNotificationPreference {
    invoice_created?: (string)[] | null;
    invoice_reminder?: (string)[] | null;
    invoice_paid?: (string)[] | null;
    invoice_expired?: (string)[] | null;
}
export interface ItemsEntity {
    name: string;
    quantity: number;
    price: number;
    category: string;
    url: string;
}
export interface FeesEntity {
    type: string;
    value: number;
}

export interface InvoiceResponse {
    id: string;
    user_id: string;
    external_id: string;
    status: string;
    merchant_name: string;
    merchant_profile_picture_url: string;
    amount: number;
    payer_email: string;
    description: string;
    invoice_url: string;
    expiry_date: string;
    available_banks?: (AvailableBanksEntity)[] | null;
    available_retail_outlets?: (AvailableRetailOutletsEntity)[] | null;
    available_paylaters?: (AvailablePaylatersEntity)[] | null;
    should_exclude_credit_card: boolean;
    should_send_email: boolean;
    created: string;
    updated: string;
    mid_label: string;
    currency: string;
    fixed_va: boolean;
    locale: string;
    customer: Customer;
    items?: (ItemsEntity)[] | null;
    fees?: (FeesEntity)[] | null;
}
export interface AvailableBanksEntity {
    bank_code: string;
    collection_type: string;
    transfer_amount: number;
    bank_branch: string;
    account_holder_name: string;
}
export interface AvailableRetailOutletsEntity {
    retail_outlet_name: string;
}
export interface AvailablePaylatersEntity {
    paylater_type: string;
}
export interface Customer {
    addresses?: (AddressesEntity)[] | null;
    email: string;
    given_names: string;
    mobile_number: string;
    surname: string;
}
export interface AddressesEntity {
    city: string;
    country: string;
    postal_code: string;
    state: string;
    street_line1: string;
    street_line2: string;
}
export interface ItemsEntity {
    name: string;
    quantity: number;
    price: number;
    category: string;
    url: string;
}
export interface FeesEntity {
    type: string;
    value: number;
}
