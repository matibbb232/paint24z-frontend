export const enum EcommerceApi {
    Products = "products",
}

export const FETCH_BASE_URL = "http://localhost/api/" as const;

export function url(endpoint: EcommerceApi): string {
    return FETCH_BASE_URL + endpoint + "/?format=json";
};

export const GET_HEADERS = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
} as const;