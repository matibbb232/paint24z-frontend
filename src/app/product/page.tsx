"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import NavBar from "../components/nav_bar";
import { CURRENCY, PAGE_PADDING } from "../resources/constants";
import { useSearchParams } from "next/navigation"
import { url } from "../resources/api";
import { PageState, PageStatus } from "../types/page_state";
import { CartList } from "../resources/cart_list";
import { DescriptionOption } from "./description"
import ProductListItem from "../product_list_item";
//TODO: Implement site design
//TODO: Implement Descritpion
//TODO: Add navbar for description
//TODO: Define navbar section
//TODO: Description for every navbar section

type description = {
  optionName: string,
  description: string
}

type descriptionProps = {
  productProp: Product,
  descriptionState: description,
  categoryProducts: Product[]
}

type serverResponse = {
  product: Product,
  categoryProducts: Product[]
}

const DESCRIPTION_MOCK: description[] = [
  { optionName: "Description", description: "Opis jeden beka Opis jeden beka Opis jeden beka Opis jeden beka" },
  { optionName: "Properties", description: "Opis dwa" },
  { optionName: "Category", description: "Opis trzy" },
  { optionName: "Similiar Items", description: "Opis cztery" },
];

function Description({productProp, descriptionState, categoryProducts}: descriptionProps){
  switch(descriptionState.optionName) {
    case "Description":  
      return(
        <div className="flex flex-col p-1">
          <div className="flex rounded-3xl bg-white items-center pt-3 pl-3 mb-5">
            <h1 className="text text-6xl">Description</h1>
          </div>
          <div className="text text-xl">
            <p>{productProp.description}</p>
          </div>
        </div>
      );
    
    case "Properties":
      return(
        <div className="flex flex-col p-1">
          <div className="flex rounded-3xl bg-white items-center pt-3 pl-3 mb-5">
          <h1 className="text text-6xl">Properties</h1>
          </div>
          <div className="text text-xl">
            <ul className="list-disc list-inside">
              <li>Manufacturer: {productProp.manufacturer.name}</li>
              <li>Weight: {parseFloat(productProp.weight).toFixed(2)} kg</li>
              <li>Composition: {productProp.composition}</li>
            </ul>
          </div>
        </div>
      );

    case "Category":
      return(
        <div className="flex flex-col p-1">
          <div className="flex rounded-3xl bg-white items-center pt-3 pl-3 mb-5">
          <h1 className="text text-6xl">Category: {productProp.category.name}</h1>
          </div>
           <div className="text text-xl">
            <p>{productProp.category.description}</p>
          </div>
        </div>
      );

    case "Similiar Items":
      console.log(typeof categoryProducts)

      return(
        
        <div className="flex flex-col p-1">
          <div className="flex rounded-3xl bg-white items-center pt-3 pl-3 mb-5">
          <h1 className="text text-6xl">Similar items</h1>
          </div>
       <ul className="grid grid-cols-3 gap-x-20 gap-y-4 justify-between mx-auto px-16">
                 {
                   categoryProducts.map((product, i) => {
                     return (<li key={i}> <ProductListItem product={product} /> </li>);
                   })
                 }
               </ul>

        </div>
      );
  }
}


function choosePage(
  pageState: PageState<serverResponse>,
  descriptionState: description,
  setDescriptionState: (desc: description) => void
) {

  const handleClick = (option: DescriptionOption) => {
    setDescriptionState(DESCRIPTION_MOCK[option]) 
  }
  
  switch (pageState.status) {
    case PageStatus.Data:
      console.log(typeof pageState.data.categoryProducts)
      return (
        <main className="container mx-auto bg-gray-100 text-black mt-8 p-4 rounded">
            <div className="flex-1 flex flex-col rounded-3xl bg-white">
              <div className="flex h-[650px]">
              <div className="flex basis-7/12 items-center justify-center">
                <img
                  src="https://magma.sklep.pl/hpeciai/506db649a6c6629fc75c9869fa7e634c/pol_pm_Tarcza-diamentowa-do-ciecia-betonu-400x32mm-400mm-MSG402-Magma-MSG-400x32-400-x-32-400x32mm-5547_3.jpg" // Replace with actual image
                  alt="Product"
                  className="w-auto h-auto object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-1 basis-2/3 flex flex-col mt-12 px-4 mx-10 relative rounded-3xl bg-gray">
                  <div className="flex basis-1/2 justify-center items-center">
                    <h2 className="text-7xl text-center font-jaro font-bold items bg-center text-white">
                      {pageState.data.product.name}
                    </h2>
                  </div>
                  <div className="flex basis-1/2 justify-center items-center">
                    <h2 className="text-6xl text-center font-jaro font-bold items bg-center text-white">
                      {parseFloat(pageState.data.product.price).toFixed(2)} {CURRENCY}
                    </h2>
                  </div>
                </div>
                <div className="flex basis-1/3 justify-center items-center">
                  <button className="bg-yellow-500 text-white px-32 py-4 rounded-xl mt-4 self-center"
                    onClick={() => CartList.add(pageState.data.product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col basis-1/2 bg-background rounded-3xl m-10">
              {/* Options */}
              <div className="flex justify-around gap-4 mt-4">
                <div className="text-xl bg-white hover:shadow hover:cursor-pointer hover:bg-gray px-20 py-3 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option1)}>Description</div>
                <div className="text-xl bg-white hover:shadow hover:cursor-pointer hover:bg-gray px-20 py-3 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option2)}>Properties</div>
                <div className="text-xl bg-white hover:shadow hover:cursor-pointer hover:bg-gray px-20 py-3 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option3)}>Category</div>
                <div className="text-xl bg-white hover:shadow hover:cursor-pointer hover:bg-gray px-20 py-3 text-black rounded-3xl" onClick={() => handleClick(DescriptionOption.Option4)}>Similiar Items</div>
              </div>
              {/* Details Section */}
              <div className="p-2 text-black">
              <hr className="w-128 h-1 mt-2 mb-4 bg-black border-0 rounded-sm"></hr>
                <Description
                productProp={pageState.data.product}
                descriptionState={descriptionState}
                categoryProducts={pageState.data.categoryProducts}
                />
              </div>

            </div>
            </div>
            {/* Product Details */}

        </main>
      );

    case PageStatus.Error:

      return (<h1>{pageState.reason}</h1>);

    case PageStatus.Loading:

      return (<h1>Loading</h1>)
  }
}


export default function ProductPage() {
  const searchParams = useSearchParams()
  const [pageState, setPageState] = useState<PageState<serverResponse>>({ status: PageStatus.Loading });
  console.log(searchParams.get('id'))

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(url("product/" + searchParams.get('id')));
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        // TODO: check if all fields are being received
        const productsData: Product = await response.json();

        const secondResponse = await fetch(url("productCat/" + productsData.category.name));
        if (!secondResponse.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        // TODO: check if all fields are being received
        const categoriesData: Product[] = JSON.parse(await secondResponse.json());

        setPageState({ status: PageStatus.Data, data: {product: productsData, categoryProducts: categoriesData} });
      } catch (err) {
        // TODO: idk if displaying any error like this is good for the UX...
        setPageState({ status: PageStatus.Error, reason: `An error occured: ${err}` });
      }
    };

    fetchDataForPosts();
  }, []);

  const [descriptionState, setDescriptionState] = useState<description>(DESCRIPTION_MOCK[0]);
  return (
    <>
      <NavBar />
      <div className={`flex flex-row gap-5 px-20 mt-5 mb-5 m-${PAGE_PADDING}`}>
        <div className="flex flex-auto flex-col grow gap-5">
          {choosePage(pageState, descriptionState, setDescriptionState)}
        </div>
      </div>
    </>
  );
}
