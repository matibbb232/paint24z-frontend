export const enum EcommerceApi {
    Products = "products",
}

const is_prod = process.env.NODE_ENV == "production";

export function url(endpoint: EcommerceApi): string {
    let FETCH_BASE_URL: string;
    if (is_prod) {
        FETCH_BASE_URL = "http://localhost/api/" as const;
    } else {
        FETCH_BASE_URL = "http://localhost:8000/" as const;
    }
    return FETCH_BASE_URL + endpoint + (is_prod ? "/?format=json" : "");
};

export const GET_HEADERS = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
} as const;