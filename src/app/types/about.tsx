export type Store = {
    name: string,
    email_address: string,
    phone_number: string,
    tax_id: string,
}

export type Address = {
    country: string,
    city: string,
    street: string,
    building_number: string,
    apartment_number?: string | null,
    postal_code: string,
}

export type AboutData = {
    store: Store,
    addresses: Address[],
}
