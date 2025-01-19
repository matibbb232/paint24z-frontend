"use client"

import { SetStateAction, useEffect, useState } from "react";
import { Product } from "../types/product";
import NavBar from "../components/nav_bar";
import { CURRENCY, PAGE_PADDING } from "../resources/constants";
import { useSearchParams } from "next/navigation"
import { url } from "../resources/api";
import { PageState, PageStatus } from "../types/page_state";
import { CartList } from "../resources/cart_list";
import { DescriptionOption } from "./description"
//TODO: Implement site design
    //TODO: Implement Descritpion
        //TODO: Add navbar for description
            //TODO: Define navbar section
        //TODO: Description for every navbar section
    
type description = {
  optionName: string,
  description: string
}
            
const DESCRIPTION_MOCK : description[] = [
    {optionName : "Option 1",description: "Opis jeden beka Opis jeden beka Opis jeden beka Opis jeden beka"},
    {optionName : "Option 2",description: "Opis dwa"},
    {optionName : "Option 3",description: "Opis trzy"},
    {optionName : "Option 4",description: "Opis cztery"},
];

  

function choosePage(pageState : PageState<Product>){

    const [descriptionState, setDescriptionState] = useState<description>(DESCRIPTION_MOCK[0]);

    const handleClick = (option: DescriptionOption) => {
      setDescriptionState(DESCRIPTION_MOCK[option])
    }

    switch(pageState.status){

        case PageStatus.Data:

        return (
            <main className="container mx-auto bg-gray-100 text-black mt-8 p-4 rounded">
            <div className="flex flex-wrap lg:flex-nowrap h-[768px]">
              <div className="flex-1 basis-2/3 flex flex-col rounded-3xl bg-white">
                <div className="flex basis-1/6 justify-start ml-10">
                    <h2 className="flex text-3xl items-center">
                        {pageState.data.name}
                    </h2>
                </div> 
                <div className="flex basis-5/6 items-center justify-center">
               <img
                  src="https://magma.sklep.pl/hpeciai/506db649a6c6629fc75c9869fa7e634c/pol_pm_Tarcza-diamentowa-do-ciecia-betonu-400x32mm-400mm-MSG402-Magma-MSG-400x32-400-x-32-400x32mm-5547_3.jpg" // Replace with actual image
                  alt="Product"
                  className="w-auto h-auto object-contain"
                />
              </div>
            </div>
              {/* Product Details */}
              <div className="flex-1 flex basis-1/3 flex-col p-4 ml-10 relative rounded-3xl bg-gray">
                <div className="flex flex-col basis-11/12 items-center justify-center absolute inset-6 rounded-3xl bg-white">
                    <div className="flex basis-1/2 justify-center items-center">
                        <h2 className="text-3xl text-center font-bold items bg-center">
                            CENA: {pageState.data.price.toFixed(2)} {CURRENCY}
                        </h2>
                    </div>
                    <div className="flex basis-1/2 justify-center items-center">
                        <button className="bg-black text-white px-16 py-2 rounded mt-4 self-center"
                        onClick={() => CartList.add(pageState.data)}> 
                        Add to Cart
                        </button>
                    </div>
                </div> 
              </div>
            </div>
    
            {/* Options */}
            <div className="flex justify-around gap-4 mt-8 bg-white rounded-3xl">
              <div className="text-xl hover:shadow hover:cursor-pointer hover:bg-gray px-16 py-2 my-2 bg-gray-300 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option1)}>Options 1</div>
              <div className="text-xl hover:shadow hover:cursor-pointer hover:bg-gray px-16 py-2 my-2 bg-gray-300 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option2)}>Options 2</div>
              <div className="text-xl hover:shadow hover:cursor-pointer hover:bg-gray px-16 py-2 my-2 bg-gray-300 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option3)}>Options 3</div>
              <div className="text-xl hover:shadow hover:cursor-pointer hover:bg-gray px-16 py-2 my-2 bg-gray-300 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option4)}>Options 4</div>
            </div>
    
            {/* Details Section */}
            <div className="mt-8 p-4 bg-white text-black rounded">
              <h3 className="text-lg font-bold mb-4">{descriptionState.optionName}</h3>
              <p>{descriptionState.description}</p>
            </div>
          </main>
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
