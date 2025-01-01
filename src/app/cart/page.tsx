"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { CartList } from "../resources/cart_list";

export default function Cart() {
    const [cartList, setCartList] = useState<Product[]>([]);

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
        <></>
    );
}