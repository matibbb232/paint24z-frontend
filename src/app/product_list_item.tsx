import { CartList } from "./resources/cart_list";
import { CURRENCY } from "./resources/constants";
import { Product } from "./types/product";

type ProductProps = {
    name: string,
    image_path?: string,
    price: number,
    currency?: string
};

function addToCart(product: Product) {
    CartList.add(product);
    window.dispatchEvent(new Event('storage'));
}

export default function ProductListItem({ product }: { product: Product }) {
    // TODO: Add separate image path to each product! 
    return (
        <div className="grid grid-cols-1 center justify-center justify-items-center 
            rounded-3xl bg-white py-10 aspect-square">
            <img src={"https://picsum.photos/300"} className="aspect-square" />
            <h1 className="py-2">{product.name}</h1>
            <hr className="w-4/5 h-2px mx-5 bg-black" />
            <p className="pt-2">{product.price.toFixed(2)} {CURRENCY}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
    );
};