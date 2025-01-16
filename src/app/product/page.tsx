"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import NavBar from "../components/nav_bar";
import { CURRENCY, PAGE_PADDING } from "../resources/constants";
import { useSearchParams } from "next/navigation"
import { url } from "../resources/api";
import { PageState, PageStatus } from "../types/page_state";

//TODO: Implement site design
    //TODO: Implement Top Panel
        //TODO: Add "add to cart" button
        //TODO: Add picture
        //TODO: Add product name
    //TODO: Implement Descritpion
        //TODO: Add navbar for description
            //TODO: Define navbar section
        //TODO: Description for every navbar section
            

function choosePage(pageState : PageState<Product>){

    switch(pageState.status){

        case PageStatus.Data:

        return (
        <div className="grid grid-cols-1 center justify-center justify-items-center 
        rounded-3xl bg-white p-8 aspect-square" 
        >
            <div className="mx-auto grid grid-cols-2 grid-rows-1 items-center">
                <div className="mx-auto">
                    <h1 className="py-2">{pageState.data.name}</h1>
                </div>
                <div className="float-right">
                    <p className="py-2">{pageState.data.price.toFixed(2)} {CURRENCY}</p>
                </div>
            </div>
            <hr className="w-4/5 h-2px mx-5 bg-black" />
        </div>
        );

        case PageStatus.Error:
        
        return(<h1>Got some error</h1>);

        case PageStatus.Loading:
        
        return(<h1>Loading</h1>)
    }
}

export default function ProductPage() {
    const searchParams = useSearchParams()
    console.log(searchParams.get('id'))
    const [pageState, setPageState] = useState<PageState<Product>>({ status: PageStatus.Loading });

    useEffect(() => {
        const fetchDataForPosts = async () => {
        try {
            const response = await fetch(url("product/" + searchParams.get('id')));
            if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
            }
            // TODO: check if all fields are being received
            const productsData: Product = await response.json();
            setPageState({ status: PageStatus.Data, data: productsData });
        } catch (err) {
            // TODO: idk if displaying any error like this is good for the UX...
            setPageState({ status: PageStatus.Error, reason: `An error occured: ${err}` });
        }
        };

    fetchDataForPosts();
  }, []);
    return (
        <>
            <NavBar />
            <div className={`flex flex-row gap-5 px-20 mt-5 mb-5 m-${PAGE_PADDING}`}>
                <div className="flex flex-auto flex-col grow gap-5">
                    {choosePage(pageState)}
                </div>
            </div>
        </>
    );
}
