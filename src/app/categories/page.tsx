"use client"

import "constants";
import NavBar from "../components/nav_bar";
import LoadingDots from "../components/loading_dots";
import { useEffect, useState } from "react";
import { EcommerceApi, api_url } from "../resources/api";
import { PageState, PageStatus } from "../types/page_state";
import { Category } from "./types";
import CategoryListItem from "./category_list_item";
import ProductListItem from "../product_list_item";

function choosePage(pageState: PageState<Category[]>) {
  switch (pageState.status) {
    case PageStatus.Data:
      return (
        <ul className="py-10 grid grid-cols-2 gap-20 justify-between mx-auto px-40 scroll-auto">
          {
            // TODO: fetch 1 product from /api/products?category=<this_category>
            pageState.data.map((category, i) => {
              return (<li key={i}> <CategoryListItem id={category.id} name={category.name} img_url={'http://localhost/images/RA_logo'} /> </li>);
            })
          }
        </ul>
      );
    case PageStatus.Error:
      return (
        <div className="grid grid-rows-2 grid-cols-1 place-items-center">
          <h1>{"Something went wrong..."}</h1>
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

export default function Index() {
  const [pageState, setPageState] = useState<PageState<Category[]>>({ status: PageStatus.Loading });

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(api_url(EcommerceApi.Categories));
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        // TODO: check if all fields are being received
        const categoriesData: Category[] = await response.json();
        setPageState({ status: PageStatus.Data, data: categoriesData });
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
