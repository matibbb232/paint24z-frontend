export enum EcommerceApi {
    Products = "products",
    Categories = "categories",
}

const is_prod = process.env.NODE_ENV == "production";

let FETCH_BASE_URL: string;
if (is_prod) {
    FETCH_BASE_URL = "http://localhost/api/" as const;
} else {
    FETCH_BASE_URL = "http://localhost:8000/" as const;
}

export function api_url<T>(endpoint: string, searchParams: Map<string, string> = new Map()): string {
    return FETCH_BASE_URL
        + endpoint
        + (is_prod
            ? ("/?format=json" + ((searchParams.size) > 0 ? '&' : ''))
            : ((searchParams.size) > 0 ? '?' : ''))
        + searchParams
            .entries()
            .map(([k, v]) => `${k}=${v}`)
            .toArray()
            .join('&');
};

export const GET_HEADERS = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
} as const;