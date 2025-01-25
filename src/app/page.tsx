"use client"

import NavBar from "./components/nav_bar";
import LoadingDots from "./components/loading_dots";
import "constants";
import { useEffect, useState } from "react";
import { EcommerceApi, api_url } from "./resources/api";
import ProductListItem from "./product_list_item";
import { Product } from "./types/product";
import { PageState, PageStatus } from "./types/page_state";
import { PAGE_PADDING } from "./resources/constants";
import { useSearchParams } from "next/navigation";

function choosePage(pageState: PageState<Product[]>, searchParams: ReturnType<typeof useSearchParams>) {
  switch (pageState.status) {
    case PageStatus.Data:
      return (
        <ul className="grid grid-cols-3 gap-x-20 gap-y-4 justify-between mx-auto px-16">
          {
            pageState.data.map((product, i) => {
              return (<li key={i}> <ProductListItem product={product} /> </li>);
            })
          }
        </ul>
      );
    case PageStatus.Error: // TODO: return some static error page
      return (
        <div className="grid grid-rows-2 grid-cols-1 place-items-center">
          <h1>{"Something went wrong..."}</h1>
          <h2>{"No items to display :("}</h2>
          <h3>{`Reason: ${pageState.reason ?? "unknown"}`}</h3>)
        </div>
      );
    case PageStatus.Loading:
      return (
        <div className="flex grow items-center justify-center">
          <LoadingDots />
        </div>
      );
  }
}

const OPTIONS_MOCK = [
  'Products on page: 50',
  'Filter',
  'Sort by: Price Asc.'
];

export default function Index() {
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState<Product[]>>({ status: PageStatus.Loading });

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        let params = new Map();
        if (searchParams.get('category') != null) {
          params = new Map([['category', searchParams.get('category')]])
        }
        const response = await fetch(api_url(EcommerceApi.Products, params));
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        // TODO: check if all fields are being received
        const productsData: Product[] = await response.json();
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
      <ul className={`flex justify-between my-5 py-1 mx-${PAGE_PADDING * 3 + 1} bg-white`}>
        {
          ...[OPTIONS_MOCK.map((opt, i) => (
            <li key={i} className="px-3 py-2 text-black font-normal"> {opt} </li>))]
        }
      </ul>
      {choosePage(pageState, searchParams)}
    </>
  );
}
