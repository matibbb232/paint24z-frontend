import { CartList } from "./resources/cart_list";
import { CURRENCY } from "./resources/constants";
import { Product } from "./types/product";
import { useRouter } from "next/navigation"


export default function ProductListItem({ product }: { product: Product }) {
    // TODO: Add separate image path to each product! 
    const router = useRouter()
    function GoToProducts(productId : string){
        router.push('/product?id='+productId) 
        window.location.reload()
    }
    console.log('photo_id=', product.photo_id);
    return (
        <div className="grid grid-cols-1 center justify-center justify-items-center 
            rounded-3xl bg-white p-8 aspect-square hover:shadow-lg hover:cursor-pointer">
            <img src={'http://localhost/images/' + product.photo_id} className="w-[300px] h-auto aspect-square rounded-2xl shadow-l transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105" alt={`A photo of ${product.name}`} onClick={() => GoToProducts(product.id)} />
            <h1 className="py-2" onClick={() => GoToProducts(product.id)}>{product.name}</h1>
            <hr className="w-4/5 h-2px mx-5 bg-black" onClick={() => GoToProducts(product.id)}/>
            <p className="py-2" onClick={() => GoToProducts(product.id)}>{parseFloat(product.price).toFixed(2)} {CURRENCY}</p>
            <div
                className="flex flex-row justify-around rounded-lg bg-black mb-0 mx-16 px-2 py-3 transition ease-in-out delay-50 hover:shadow-lg hover:cursor-pointer"
                onClick={() => CartList.add(product)}>
                <span className="text-white text-start">Add to cart</span>
                <svg className="fill-white h-auto w-[12%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" preserveAspectRatio="true">
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
            </div>
        </div>
    );
};