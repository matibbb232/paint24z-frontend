"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { CartList } from "../resources/cart_list";
import NavBar from "../components/nav_bar";
import Stages from "./stages";
import { DetailsPanel, quantitiesFromProducts } from "./details_panel";
import Panel from "./panels"
import { StageButton } from "./panels"
import { ShoppingStage } from "../types/shopping_stages";
import { CURRENCY, PAGE_PADDING } from "../resources/constants";
import { useRouter } from "next/navigation";

export default function Cart() {
    const router = useRouter();
    const [cartList, setCartList] = useState<Product[]>([]);
    const [init, setInit] = useState(false);
    const [stage, setStage] = useState<ShoppingStage>(ShoppingStage.Cart);
    const quantities = quantitiesFromProducts(cartList);
    const incrementQuantity = (product: Product) => {
        setCartList([...cartList, product]);
    };
    const decrementQuantity = (product: Product) => {
        console.log("product to remove: ", product);
        const newArray = [];

        let shouldRemove = true;

        for (const p of cartList) {
            if (p.id === product.id && shouldRemove) {
                shouldRemove = false;
                continue;
            }
            newArray.push(p);
        }

        console.log("new list: ", newArray);

        setCartList(newArray);
    };

    // once on load
    useEffect(
        () => {
            console.log('1st useEffect:', CartList.get())
            setCartList(CartList.get());
            setInit(true);
        }, []
    );

    // on every item insert
    useEffect(
        () => {
            if (init) {
                console.log('2nd useEffect:', CartList.get(), cartList)
                CartList.set(cartList);
            }
        }, [cartList]
    );

    return (
        <>
            <NavBar />
            <div className={`flex flex-row gap-5 px-20 mt-5 mb-5 m-${PAGE_PADDING}`}>
                <div className="flex flex-auto flex-col grow gap-5">
                    <Stages currentStage={stage} />
                    <Panel stage={stage} quantities={quantities} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
                    <div className="flex-1 flex justify-between bg-white p-5 rounded-lg">
                        <span className="font-jaro font-bold text-7xl">Total:</span>
                        <span className="font-jaro font-bold text-7xl">{`${cartList.reduce((accum, product) => accum + parseFloat(product.price), 0).toFixed(2)} ${CURRENCY}`}</span>
                    </div>
                </div>
                <div className="flex flex-auto flex-col gap-5 rounded-2xl justify-center text-center bg-white p-5">
                    <h1 className="flex-4 font-bold font-inter text-3xl">Details</h1>
                    <DetailsPanel stage={stage} />
                    {stage === ShoppingStage.Cart ?
                        <button onClick={() => router.push('/login')} className="rounded-lg bg-[#494949] text-white font-bold text-3xl"> ... or login </button>
                        : <p></p>
                    }
                    <StageButton stage={stage} setStage={setStage} />
                </div>
            </div>
        </>
    );
}