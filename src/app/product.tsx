type ProductProps = {
    name: string,
    image_path?: string,
    price: number,
    currency?: string
};

export default function Product({name, image_path, price, currency}: ProductProps) {
    return (
        <div className="grid grid-cols-1 center justify-center justify-items-center 
            rounded-3xl bg-white py-10 aspect-square">
            <img src={image_path ?? "https://picsum.photos/300"} className="aspect-square"/>
            <h1 className="py-2">{name}</h1>
            <hr className="w-4/5 h-2px mx-5 bg-black"/>
            <p className="pt-2">{price} {currency ?? "PLN"}</p>
        </div>
    );
};