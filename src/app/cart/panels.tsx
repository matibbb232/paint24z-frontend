"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "../types/product";
import ProductListItem from "./product_list_item";
import { ShoppingStage } from "../types/shopping_stages";
import { checkDetails } from "./details_panel";
import { api_url } from "../resources/api";
import { CartList } from "../resources/cart_list";
import { isAuthenticated } from "../components/is_auth";
import { useRouter } from "next/navigation";

type PanelProps = {
    stage: ShoppingStage,
    quantities: Map<Product, number>,
    incrementQuantity: (product: Product) => void,
    decrementQuantity: (product: Product) => void,
}

type StageButtonProps = {
    stage: ShoppingStage
    setStage: Dispatch<SetStateAction<ShoppingStage>>
}

const DOSTAWY: { value: string, label: string }[] = [
    { value: 'dhl', label: 'DHL' },
    { value: 'ups', label: 'UPS' },
    { value: 'fedx', label: 'FEDx' }
];

export function StageButton({ stage, setStage }: StageButtonProps) {
    const router = useRouter();
    const handleClick = (s: ShoppingStage) => {
        if (stage === ShoppingStage.Cart) {
            if (!checkDetails()) {
                console.log('EXITING');
                return;
            }
        }
        console.log('PROCEEDING');

        if (stage === ShoppingStage.Checkout && s === ShoppingStage.Checkout) {
            if (!isAuthenticated()) {
                alert('You have to log in to continue.');
                router.push('/login');
            }
            const cartList = CartList.get();
            const map: Map<string, number> = new Map();
            for (const listItem of cartList) {
                map.set(listItem.id, (map.get(listItem.id) ?? 0) + 1)
            }

            fetch(api_url('makeorder'), {
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
                body: JSON.stringify(
                    map.entries().map(([id, quantity]) => { return { product_id: id, quantity: quantity.toString() }; }).toArray()
                ),

            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Couldn't make order: ${response.status} ${response.statusText}`)
                }
                alert(`Order made!`);
            });
            return;
        }
        console.log('SETTING STAGE = ', s)
        setStage(s)
    }

    switch (stage) {
        case ShoppingStage.Cart:
            return (
                <div className="flex justify-center">
                    <button className="w-48 h-12 items-center bg-highlightRed rounded-3xl font-jaro font-bold text-3xl" onClick={() => handleClick(ShoppingStage.Shipping)}>
                        Continue {">"}
                    </button>
                </div>
            );
        case ShoppingStage.Shipping:
            return (
                <div className="flex flex-row">
                    <div className="flex basis-1/2 items-center justify-start">
                        <button className="w-48 h-12 items-center bg-highlightRed rounded-3xl font-jaro font-bold text-3xl" onClick={() => handleClick(ShoppingStage.Cart)}>
                            {"<"} Previous
                        </button>
                    </div>
                    <div className="flex basis-1/2 items-center justify-end">
                        <button className="w-48 h-12 items-center bg-highlightRed rounded-3xl font-jaro font-bold text-3xl" onClick={() => handleClick(ShoppingStage.Checkout)}>
                            Next {">"}
                        </button>
                    </div>
                </div>
            );
        case ShoppingStage.Checkout:
            return (
                <div className="flex flex-auto flex-row">
                    <div className="flex basis-1/2 items-center justify-start">
                        <button className="w-48 h-12 items-center bg-highlightRed rounded-3xl font-jaro font-bold text-3xl" onClick={() => handleClick(ShoppingStage.Shipping)}>
                            {"<"} Previous
                        </button>
                    </div>
                    <div className="flex basis-1/2 items-center justify-end">
                        <button className="w-48 h-16 items-center bg-highlightRed rounded-3xl font-jaro font-bold text-3xl" onClick={() => handleClick(ShoppingStage.Checkout)}>
                            Finish
                        </button>
                    </div>
                </div>
            );
    }
}


export default function Panel({ stage, quantities, incrementQuantity, decrementQuantity }: PanelProps) {

    const [shipping, setShipping] = useState("-");
    const handleClick = (option: string) => {
        setShipping(option)
    }

    switch (stage) {
        case ShoppingStage.Cart:

            return (
                <div className="bg-white flex flex-col grow rounded-2xl">
                    <div key={1} className="flex-5 flex flex-col grow rounded-2xl bg-white 
                        px-5 py-5 gap-5 h-96 shadow-lg overflow-y-scroll scrollbar">
                        {
                            quantities.entries().toArray().length === 0
                                ? <div className="flex justify-center items-center font-inter grow text-backgroundSecondary">No items in cart</div>
                                : quantities.entries().map(([product, quantity], i) => <ProductListItem
                                    key={i}
                                    product={product}
                                    quantityProps={{
                                        quantity: quantity,
                                        incrementQuantity: incrementQuantity,
                                        decrementQuantity: decrementQuantity,
                                    }} />)
                        }
                    </div>
                </div>
            );
        case ShoppingStage.Shipping:
            return (
                <div key={1} className="flex-5 flex flex-col grow rounded-2xl bg-white 
                        px-5 py-5 gap-5 h-96 shadow-lg overflow-y-scroll scrollbar">
                    <div className="grid grid-cols-4 gap-4">

                        {DOSTAWY.map(dostawa => (<div key={dostawa.value} className="flex-col flex justify-center rounded-lg bg-gray p-2" onClick={() => handleClick(dostawa.label)}>
                            <div className="flex flex-auto basis-1/6">
                                <input id={dostawa.value} type="radio" value={dostawa.value} checked={shipping === dostawa.label} name="shipping" className="text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            </div>
                            <div className="flex basis-5/6 items-center justify-center pt-4 pb-8 font-jaro font-bold text-3xl">
                                {dostawa.label}
                            </div>
                        </div>))}

                    </div>
                </div>

            );

        case ShoppingStage.Checkout:
            return (
                <div key={1} className="flex-5 flex flex-col grow rounded-2xl bg-white 
                        px-5 py-5 gap-5 h-96 shadow-lg overflow-y-scroll scrollbar">
                    <div className="flex p-2 bg-background rounded-xl pb-4">
                        <table className="w-full text-left table-auto min-w-max bg-background rounded-lg">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-jaro text-3xl antialiased font-bold leading-none text-black">
                                            Product
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-jaro text-3xl antialiased font-bold leading-none text-black">
                                            Amount
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-jaro text-3xl antialiased font-bold leading-none text-black">
                                            Price
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {quantities.entries().map(([product, quantity], i) => (
                                    <tr key={i}>
                                        <td className="p-4 pl-8 border-b border-blue-gray-50">
                                            <p className="block font-jaro text-xl antialiased font-normal leading-normal text-blue-gray-900">
                                                {product.name}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-jaro text-xl antialiased font-normal leading-normal text-blue-gray-900">
                                                {quantity}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-jaro text-xl antialiased font-normal leading-normal text-blue-gray-900">
                                                {(parseFloat(product.price) * quantity).toFixed(2)}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col bg-background rounded-xl p-2">
                        <div className="flex pt-2">
                            <p className="font-jaro pl-3 font-bold text-3xl">Chosen shipping method:</p>
                        </div>
                        <hr className="w-128 h-1 mt-2 mb-4 bg-black border-0 "></hr>
                        <div className="flex p-2">
                            <p className="font-jaro font-normal text-2xl">{shipping}</p>
                        </div>
                    </div>
                </div>
            );
    }
}
