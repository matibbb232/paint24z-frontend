import { Product } from "../types/product";

const LOCAL_STORAGE_SHOPPING_CART: string = "ShoppingCart" as const;

export class CartList {
    public static get(): Product[] {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHOPPING_CART) || "[]");
    }
    
    public static add(product: Product) {
        const products: Product[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHOPPING_CART) || "[]");
        products.push(product);
        localStorage.setItem(LOCAL_STORAGE_SHOPPING_CART, JSON.stringify(products));
        window.dispatchEvent(new Event('storage'));
    }

    public static set(products: Product[]) {
        localStorage.setItem(LOCAL_STORAGE_SHOPPING_CART, JSON.stringify(products));
        window.dispatchEvent(new Event('storage'));
    }
}