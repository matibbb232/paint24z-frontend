"use client"

import { useEffect, useState } from "react";
import { api_url } from "../resources/api";
import { useRouter } from "next/navigation";
import Select from "react-select";

export default function Index() {
    type Product = {
        id: string,
        name: string,
        description: string,
        price: string,
        composition: number,
        weight: number,
        instock: number,
        categories_id: string,
        manufacturers_id: string,
    };
    type Category = { id: string, name: string, description: string };
    type Manufacturer = { id: string, name: string };

    const router = useRouter();
    const [product, setProduct] = useState<Product>({
        id: '0',
        name: '',
        description: '',
        price: '',
        composition: 0,
        weight: 0,
        instock: 0,
        categories_id: '',
        manufacturers_id: '',
    });
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [image, setImage] = useState<File | null | undefined>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories_url = 'categories';
                const manufacturers_url = 'manufacturers';
                const categories_response = await fetch(api_url(categories_url));
                const manufacturers_response = await fetch(api_url(manufacturers_url));
                if (!categories_response.ok || !manufacturers_response.ok) {
                    throw new Error(`HTTP status: categories: ${categories_response.status}, manufacturers: ${manufacturers_response.status}`);
                }
                setCategories(await categories_response.json());
                setManufacturers(await manufacturers_response.json());
            } catch (err) {
                console.log(err);
                setManufacturers([]);
                setCategories([]);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async () => {
        console.log('product: ', product);
        console.log('image: ', image);
        // validation
        if (product.name === ''
            || product.description === ''
            || product.price === ''
            || product.composition === 0
            || product.weight === 0
            || product.instock === 0
            || product.categories_id === ''
            || product.manufacturers_id === ''
            || image == null
        ) {
            alert('You must enter values to all fields!');
            return;
        }
        try {
            const images_response = await fetch("/images", { method: "POST", body: image });
            // TODO: zobaczyć czy zwraca ok
            // TODO: jeśli tak, to dorzucić image_path do produktu
            const addproduct_response = await fetch(api_url("/addproduct"), {
                method: "POST",
                body: JSON.stringify(product)
            });
            if (!addproduct_response.ok || !images_response.ok) {
                alert("Success!")
                router.push("/dashboard");
            } else {
                throw new Error(`Error: addproducts status code: ${addproduct_response.status}, images status code: ${images_response.status}`);
            }
        } catch (err) {
            console.log('an error occured: ', err)
            alert("Failure: " + err)
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-2xl justify-center items-center p-3 gap-3">
            <h1 className="flex justify-center text-center font-bold font-jaro text-7xl p-5 pb-7 cursor-pointer" onClick={() => router.push("/")}>Our Shop</h1>
            <div className="flex flex-row h-[300px] flex-1 justify-around bg-white text-black text-center 
                    rounded-2xl cursor-pointer hover:bg-neutral-100 duration-300">
            </div>
            <hr className="flex-1 bg-black w-full h-1 mx-auto"></hr>

            <div className="bg-zinc-100 rounded-3xl px-5 flex flex-col w-[750px] justify-center gap-3 item-center">
                <h2 className="flex flex-1 justify-center text-center font-bold font-jaro text-5xl p-5 pb-7 cursor-pointer">New product</h2>
                <div className="flex flex-1 flex-row gap-3 gap-x-10">
                    <InputPane
                        onInput={(e) => setProduct({ ...product, name: e.target.value.toString() })}
                        name="Name"
                        flex={"flex-1"} index={1} />
                    <InputPane
                        onInput={(e) => setProduct({ ...product, price: e.target.value.toString() })}
                        name="Price"
                        flex={"flex-3"} index={2} />
                </div>
                <InputPane
                    onInput={(e) => setProduct({ ...product, description: e.target.value.toString() })}
                    name="Description" height={"h-full"}
                    flex={"flex-1"} index={3} />
                <div className="flex flex-1 flex-row gap-3 gap-x-10">
                    <InputPane
                        onInput={(e) => setProduct({ ...product, weight: parseFloat(e.target.value ?? '') })}
                        name="Weight" width="w-3"
                        flex={"flex-1"} index={4} />
                    <InputPane
                        onInput={(e) => setProduct({ ...product, composition: parseInt(e.target.value ?? '') })}
                        name="Composition" width="w-3"
                        flex={"flex-1"} index={5} />
                    <InputPane
                        onInput={(e) => setProduct({ ...product, instock: parseInt((e.target.value ?? '').toString()) })}
                        name="In stock" width="w-3"
                        flex={"flex-1"} index={6} />
                </div>
                <div className="flex flex-1 flex-row gap-3 justify-start items-center">
                    <span className="text-backgroundSecondary text-lg text-start">Image: </span>
                    <input onChange={(e) => { const fileList = e.target.files; console.log(fileList); setImage(fileList?.item(0)); }} id="image_input" className="" placeholder="Image" type="file" />
                </div>
                {/* Category */}
                <Select
                    className="flex flex-1 justify-center items-center h-10 bg-neutral-300 rounded-xl p-2 shadow-none border-none"
                    options={manufacturers.map((man) => { return { value: man.id, label: man.name }; })}
                    onChange={(new_value) => { if (new_value) setProduct({ ...product, manufacturers_id: new_value.value }) }}
                    name={"Manufacturers"}
                    placeholder="Manufacturer"
                />
                <Select
                    className="flex flex-1 justify-center items-center h-10 bg-neutral-300 rounded-xl p-2 shadow-none border-none"
                    options={categories.map((category) => { return { value: category.id, label: category.name }; })}
                    onChange={(new_value) => { if (new_value) setProduct({ ...product, categories_id: new_value.value }) }}
                    name={"Categories"}
                    placeholder="Category"
                />
                <button onClick={() => onSubmit()}
                    className={`bg-highlightYellow cursor-pointer py-2 text-white text-2xl rounded-3xl`}>
                    Submit
                </button>
                <button onClick={() => { if (confirm('Are you sure you want to abort?\nYou\'ll lose all your changes!')) { router.back() } }}
                    className={`bg-highlightRed cursor-pointer py-2 text-white text-2xl rounded-3xl`}>
                    Abort
                </button>
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