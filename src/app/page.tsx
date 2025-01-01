"use client"

import NavBar from "./components/nav_bar";
import LoadingDots from "./components/loading_dots";
import "constants";
import { useEffect, useState } from "react";
import { EcommerceApi, url } from "./resources/api";
import ProductListItem from "./product_list_item";
import { Product } from "./types/product";
import { PageState, PageStatus } from "./types/page_state";

function choosePage(pageState: PageState<Product[]>) {
  switch (pageState.status) {
    case PageStatus.Data:
      return (
        <ul className="grid grid-cols-3 gap-x-20 gap-y-4 justify-between px-10">
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
          {pageState.reason ? (<h3>{`Reason: ${pageState.reason}`}</h3>) : <></>}
        </div>
      );
    case PageStatus.Loading:
      return (
        <div className="flex items-center justify-center">
          <LoadingDots />
        </div>
      );
  }
}

export default function Index() {
  const [pageState, setPageState] = useState<PageState<Product[]>>({ status: PageStatus.Loading });

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(url(EcommerceApi.Products));
        if (!response.ok) {
          setPageState({ status: PageStatus.Error, reason: `HTTP status: ${response.status}` });
          return;
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
      {choosePage(pageState)}
    </>
  );
}
