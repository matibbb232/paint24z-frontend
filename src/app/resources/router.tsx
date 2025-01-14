export const ROUTES = {
    index: "/",
    cart: "/cart",
    product: (id: number) => `/products/${id}`,
} as const;

export class Navigator {
    public static go(url: string): void {
        if (window.location.pathname !== url) {
            window.location.href = url;
        }
    }
}