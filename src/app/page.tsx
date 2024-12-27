"use client"
import NavBar from "./components/nav_bar";
import "constants";
import { useEffect, useState } from "react";
import { EcommerceApi, url } from "./resources/constants";
import ProductListItem from "./product";
import { Product } from "./types/product";
import { PageState } from "./types/_page";
import { RotatingLines } from "react-loader-spinner";


function chooseChild(pageState: PageState, products: Product[]) {
  switch (pageState) {
    case PageState.Data:
      return (<ul className="grid grid-cols-3 gap-x-20 gap-y-4 justify-between px-10">
        {
          products.map((product, i) => {
            const props = {
              name: product.name,
              image_path: undefined,
              price: product.price,
              currency: "PLN",
            };
            return (<li key={i}> <ProductListItem {...props} /> </li>);
          })
        }
      </ul>);
    case PageState.Error: // TODO: return some static error page
      return (<h1> Something went wrong... </h1>);
    case PageState.Loading:
      return (<RotatingLines strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true} />);
  }
}

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageState, setPageState] = useState(PageState.Loading);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(url(EcommerceApi.Products));
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let productsData = await response.json();
        setProducts(productsData);
        setPageState(PageState.Data);
      } catch (err) {
        setProducts([]);
        setPageState(PageState.Error);
      }
    };

    fetchDataForPosts();
  }, []);

  return (
    <>
      <NavBar />
      {
        chooseChild(pageState, products)
      }
    </>
  );
}
