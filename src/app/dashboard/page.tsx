"use client"

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { api_url } from "../resources/api";
import { CURRENCY } from "../resources/constants";
import { useRouter } from "next/navigation";
import { Order } from "../types/order";


const enum Subpages {
    orders = 'Orders',
    products = 'Products',
}

export default function Page() {
    const [page, _setPage] = useState(Subpages.products);
    const [data, setData] = useState<Order[] | Product[]>([]);

    function setPage(new_page: Subpages) {
        setData([]);
        _setPage(new_page);
    }

    useEffect(() => {
        setData([]);
        const fetchData = async () => {
            try {
                let link;
                switch (page) {
                    case Subpages.orders:
                        link = 'orders';
                        break;
                    case Subpages.products:
                        link = 'products';
                        break;
                }
                console.log(`fetching from: ${link}`);
                const response = await fetch(api_url(link));
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                const data: Product[] | Order[] = await response.json();
                setData(data);
            } catch (err) {
                console.log(err);
                setData([]);
            }
        };

        fetchData();
    }, [page]);


    return (
        <div className="mx-10 flex flex-col justify-items justify-center">
            <h1 className="justify-center text-center font-bold font-jaro text-7xl p-5 pb-7">Our Shop</h1>
            <hr className="flex-1 bg-black w-full h-1"></hr>
            <div className="flex flex-row justify-center divide-x-3 divide-black">
                {/* Left panel */}
                <div className="flex-300 flex flex-col w-[300px] p-5 gap-5">
                    <VerticalListItem name={Subpages.orders} selected={page === Subpages.orders} on_click={() => setPage(Subpages.orders)} />
                    <VerticalListItem name={Subpages.products} selected={page === Subpages.products} on_click={() => setPage(Subpages.products)} />
                </div>
                {/* Right panel */}
                <div className="flex-1 flex flex-col w-[300px] p-5 gap-5 duration-300 ease-in-out">
                    <ChoosePage page={{ subpage: page, data: data }} />
                </div>
            </div>
        </div>
    );
}

function VerticalListItem({ name, selected, on_click }: Readonly<{ name: string, selected: boolean, on_click: () => void }>) {
    return (
        <div className={`${selected ? "bg-white" : ""} p-3 text-black cursor-pointer text-center rounded-2xl duration-300 hover:bg-neutral-200`} onClick={() => on_click()}>
            {name}
        </div>
    );
}

function ChoosePage({ page }: Readonly<{ page: { subpage: Subpages, data: Order[] | Product[] } }>) {
    const router = useRouter();
    switch (page.subpage) {
        case Subpages.orders:
            return (
                <>
                    {
                        (page.data as Order[])
                            .map((order, i) => {
                                return (
                                    <div key={i} className="flex flex-row justify-around bg-white p-3 text-black text-center rounded-2xl cursor-pointer hover:bg-neutral-100 duration-300">
                                        <span className="flex-1">{`order-${order.id}`}</span>
                                        <span className="flex-1">{`ordered on: ${order.order_date}`}</span>
                                        <span className="flex-1">{`${order.amount.toFixed(2)} ${CURRENCY}`}</span>
                                        <span className="flex-1">{`status: ${order.status}`}</span>
                                    </div>
                                );
                            }
                            )
                    }
                </>
            );
        case Subpages.products:
            return (
                <>
                    <div onClick={() => router.push('/add_product')} className="bg-highlightGreen text-white flex flex-row justify-around p-3 
                        text-center rounded-2xl cursor-pointer hover:bg-[#4FB170] duration-300">
                        Add new product
                    </div>
                    {
                        (page.data as Product[])
                            .map((product, i) =>
                                (<ProductListItem product={product} key={i} />)
                            )
                    }
                </>
            );
    }
}

function ProductListItem({ product, key }: { product: Product, key: number }) {
    const [expanded, setExpanded] = useState(false);
    const [productToSubmit, setProductToSubmit] = useState(product);

    const disabled = !(productToSubmit.name !== product.name
        || productToSubmit.composition !== product.composition
        || productToSubmit.description !== product.description
        || productToSubmit.instock !== product.instock
        || productToSubmit.price !== product.price
        || productToSubmit.weight !== product.weight);

    const onSubmit = async () => {
        if (!disabled) {
            await fetch(api_url("/updateproduct"), {
                method: "PUT",
                body: JSON.stringify(productToSubmit)
            });
            window.location.reload();
        } else {
            // unreachable
            console.log('product=',product,'productToSubmit=',productToSubmit);
            alert("Nothing to submit")
        }
    };

    return !expanded ? (
        <div key={key} className="flex flex-row items-center justify-around bg-white p-3 text-black text-center  
                rounded-2xl cursor-pointer hover:bg-neutral-100 duration-300"
            onClick={() => setExpanded(!expanded)}>
            <img src={/* TODO: product.img! */ "https://picsum.photos/400"} className="flex-2 w-12 h-auto aspect-square rounded-lg shadow-lg" />
            <span className="flex-1">{product.name}</span>
            <span className="flex-1 overflow-ellipsis">{product.description}</span>
            <span className="flex-1">{`${parseFloat(product.price).toFixed(2)} ${CURRENCY}`}</span>
            <span className="flex-1">{`in stock: ${product.instock}`}</span>
        </div>
    ) : (
        <div className="flex flex-col bg-white rounded-2xl p-3 gap-3">
            <div key={key} className="flex flex-row h-[300px] flex-1 justify-around bg-white text-black text-center 
                    rounded-2xl cursor-pointer hover:bg-neutral-100 duration-300"
                onClick={() => setExpanded(!expanded)}>
                <svg className="w-8 h-8 aspect-square" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier"> <polygon fill="#000000" points="5,30.9 8.1,34 24,18.1 39.9,34 43,30.9 24,12" /> </g>
                </svg>
            </div>
            <hr className="flex-1 bg-black w-full h-1"></hr>
            <div className="flex flex-2 flex-row justify-around gap-5">
                <img src={/* TODO: product.img! */ "https://picsum.photos/400"} className="flex-1 w-[10px] h-auto aspect-square rounded-2xl shadow-lg m-3" />
                <div className="flex flex-1 flex-col w-[300px] justify-around py-16">
                    <div className="flex flex-1 flex-row gap-3 gap-x-10">
                        <InputPane
                            onInput={(e) => setProductToSubmit({ ...productToSubmit, name: e.target.value.toString() })}
                            name="Name" placeholder={product.name}
                            flex={"flex-1"} index={key} />
                        <InputPane
                            onInput={(e) => setProductToSubmit({ ...productToSubmit, price: e.target.value.toString() })}
                            name="Price" placeholder={parseFloat(product.price).toFixed(2)}
                            flex={"flex-3"} index={key} />
                    </div>
                    <InputPane 
                        onInput={(e) => setProductToSubmit({ ...productToSubmit, description: e.target.value.toString() })} 
                        name="Description" placeholder={product.description} height={"h-full"} 
                        flex={"flex-1"} index={key} />
                    <div className="flex flex-1 flex-row gap-3 gap-x-10">
                        <InputPane
                            onInput={(e) => setProductToSubmit({ ...productToSubmit, weight: e.target.value })}
                            name="Weight" width="w-3" placeholder={parseFloat(product.weight).toFixed(3)}
                            flex={"flex-1"} index={key} />
                        <InputPane
                            onInput={(e) => setProductToSubmit({ ...productToSubmit, composition: e.target.value })}
                            name="Composition" width="w-3" placeholder={product.composition}
                            flex={"flex-1"} index={key} />
                        <InputPane
                            onInput={(e) => setProductToSubmit({ ...productToSubmit, instock: parseInt(e.target.value.toString()) })}
                            name="In stock" width="w-3" placeholder={product.instock.toString()}
                            flex={"flex-1"} index={key} />
                    </div>
                    <button disabled={disabled}
                        onClick={() => onSubmit()}
                        className={`${disabled ? "bg-gray cursor-default" : "bg-highlightYellow cursor-pointer"} py-2 text-white text-2xl rounded-3xl`}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

type InputPaneProps = {
    name: string,
    onInput: (data: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string,
    flex: string,
    width?: string,
    index: number,
    height?: string
}

function InputPane(props: InputPaneProps) {
    return (
        <div key={props.index} className={`${props.flex} ${props.width} ${props.height} flex flex-col`}>
            <span className="text-start text-lg text-backgroundSecondary">{props.name}</span>
            <InputPaneOfType {...props} />
        </div>
    );
}

function InputPaneOfType(props: InputPaneProps) {
    return (
        <input onChange={props.onInput} onInput={() => console.log('hehe')} className="bg-neutral-300 rounded-xl p-2" placeholder={props.placeholder}></input>
    );
}
