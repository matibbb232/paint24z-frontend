"use client"

import { useEffect, useState } from "react";
import { CartList } from "../resources/cart_list";
import { useRouter } from "next/navigation";

const PAGES_ROUTES = new Map([
    ['Main Page', "/"] as const,
    // TODO: Add proper routes
    ['On Sale', ""] as const,
    ['Categories', "/categories"] as const,
    ['About Us', ""] as const,
    ['Contact', ""] as const,
]);

export default function NavBar() {
    const [itemsInCartLen, setItemsInCartLen] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setItemsInCartLen(CartList.get().length);
        function checkUserData() {
            const item = CartList.get().length;
            setItemsInCartLen(item);
        }

        window.addEventListener('storage', checkUserData);

        return () => {
            window.removeEventListener('storage', checkUserData);
        }
    }, []);

    return (
        <div className="mx-10">
            <h1 className="flex justify-center text-center font-bold font-jaro text-7xl p-5 pb-7 cursor-pointer" onClick={() => router.push("/")}>Our Shop</h1>
            <div className="flex justify-center items-center" onClick={() => router.push("/cart")}>
                <svg className="px-5 absolute top-8 right-4 h-auto w-[5.8%] hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" preserveAspectRatio="true">
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                {
                    (itemsInCartLen > 0)
                        ? <div className="absolute right-7 top-6 w-5 h-5 rounded-full 
                                inline-flex items-center justify-center 
                                font-bold text-white bg-orange-500 font-jaro">
                            {itemsInCartLen > 9 ? "9+" : itemsInCartLen}
                        </div>
                        : <></>
                }
            </div>
            <ul className="flex justify-between rounded-full px-5 py-3 mx-5 bg-highlightRed">
                {
                    PAGES_ROUTES.entries().map(([name, route], i) => (
                        <li key={i} className="transition ease-in-out delay-50 hover:bg-background duration-300
                    container flex justify-center px-5 py-3 mx-5 rounded-full bg-white cursor-pointer
                    text-black font-normal" onClick={() => router.push(route)}> {name} </li>))
                }
            </ul>
        </div>
    )
}