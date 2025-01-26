"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { CartList } from "../resources/cart_list";
import NavBar from "../components/nav_bar";
import Stages from "./stages";
import DetailsPanel from "./details_panel";
import Panel from "./panels"
import { StageButton } from "./panels"
import { ShoppingStage } from "../types/shopping_stages";
import { CURRENCY, PAGE_PADDING } from "../resources/constants";


export default function Cart() {
    const [cartList, setCartList] = useState<Product[]>([]);
    const [stage,setStage] = useState<ShoppingStage>(ShoppingStage.Cart);
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
            setCartList(CartList.get());
        }, []
    );

    // on every item insert
    useEffect(
        () => {
            CartList.set(cartList);
        }, [cartList]
    );

    return (
        <>
            <NavBar />
            <div className={`flex flex-row gap-5 px-20 mt-5 mb-5 m-${PAGE_PADDING}`}>
                <div className="flex flex-auto flex-col grow gap-5">
                    <Stages key={0} currentStage={stage} />
                    <Panel stage={stage} quantities={quantities} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} setStage={setStage} />
                    <div className="flex-1 flex justify-between bg-white p-5 rounded-lg">
                        <span className="font-jaro font-bold text-7xl">Total:</span>
                        <span className="font-jaro font-bold text-7xl">{`${cartList.reduce((accum, product) => accum + parseFloat(product.price), 0).toFixed(2)} ${CURRENCY}`}</span>
                    </div>
                </div>
                <div className="flex flex-auto flex-col gap-5 rounded-2xl justify-center text-center bg-white p-5">
                    <h1 className="flex-4 font-bold font-inter text-3xl">Details</h1>
                    <DetailsPanel stage={stage} />
                    {stage === ShoppingStage.Cart ? 
                    <button className="rounded-lg bg-[#494949] text-white font-bold text-3xl"> ... or login </button> 
                    : <p></p>
                    } 
                    <StageButton stage={stage} setStage={setStage}/>
                </div>
            </div>
        </>
    );
}

function quantitiesFromProducts(products: Product[]): Map<Product, number> {
    type ProductAndQuantity = {
        product: Product,
        quantity: number
    };

    const map = new Map<string, ProductAndQuantity>();

    for (const product of products) {
        const maybeProduct: ProductAndQuantity | undefined = map.get(product.id);

        if (maybeProduct != undefined) {
            map.set(product.id, { product: maybeProduct.product, quantity: maybeProduct.quantity + 1 });
        } else {
            map.set(product.id, { product: product, quantity: 1 });
        }
    }

    return new Map(map.entries().map(([, { product, quantity }]) => [product, quantity]));
}