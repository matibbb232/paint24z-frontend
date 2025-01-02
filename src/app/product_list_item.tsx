import { CartList } from "./resources/cart_list";
import { CURRENCY } from "./resources/constants";
import { Product } from "./types/product";

export default function ProductListItem({ product }: { product: Product }) {
    // TODO: Add separate image path to each product! 
    return (
        <div className="grid grid-cols-1 center justify-center justify-items-center 
            rounded-3xl bg-white py-10 aspect-square">
            <img src={"https://picsum.photos/300"} className="aspect-square" />
            <h1 className="py-2">{product.name}</h1>
            <hr className="w-4/5 h-2px mx-5 bg-black" />
            <p className="py-2">{product.price.toFixed(2)} {CURRENCY}</p>
            <button className="rounded-lg bg-black px-5 py-2 transition ease-in-out delay-50 hover:shadow-lg" onClick={() => CartList.add(product)}>
                <p className="text-white text-start">Add to cart</p>
                <svg className="px-5 fill-white h-auto w-[10%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" preserveAspectRatio="true">
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
            </button>
        </div>
    );
};