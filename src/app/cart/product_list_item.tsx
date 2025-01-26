import { CURRENCY } from "../resources/constants";
import { Product } from "../types/product";

type ProductProps = {
    product: Product,
    quantityProps: QuantityProps,
};

export default function ProductListItem({ product, quantityProps }: ProductProps) {
    return (
        <div className="flex flex-row gap-5 justify-between items-center p-3 rounded-2xl bg-background">
            <div className="flex-1 flex gap-5 justify-start">
                <Quantity {...{ product: product, quantityProps: quantityProps }} />
                <img src={'http://localhost/images/' + product.photo_id} className="h-24 aspect-square rounded-2xl shadow-lg" alt={`A photo of ${product.name}`} />
                <div className="flex flex-col justify-start">
                    <div className="text-2xl font-inter">{product.name}</div>
                    <div className="text-lg font-inter">{product.manufacturer.name}</div>
                    <div className="text-md font-inter text-[#A2A2A2] truncate">{product.description}</div>
                </div>
            </div>
            <div className="flex flex-3 flex-col justify-center">
                <div className="flex-2 flex justify-center text-center items-center text-[#A2A2A2]">{"Total"}</div>
                <div className="flex-3 flex justify-center text-center items-center bg-white text-black rounded-lg p-3 w-40">
                    {`${(parseFloat(product.price) * quantityProps.quantity).toFixed(2)} ${CURRENCY}`}
                </div>
                <div className="flex-2 flex justify-center text-center text-inter text-lg text-[#A2A2A2]">
                    <span className="text-highlightRed">{`${quantityProps.quantity} ×`}</span>
                    &nbsp;
                    {parseFloat(product.price).toFixed(2)}
                </div>
            </div>
        </div>
    );
}

type QuantityProps = {
    quantity: number,
    incrementQuantity: (product: Product) => void,
    decrementQuantity: (product: Product) => void,
};

function Quantity({
    product,
    quantityProps: { quantity,
        incrementQuantity,
        decrementQuantity }
}: ProductProps) {
    return (
        <div className="flex flex-col bg-highlightRed rounded-lg p-2 h-24 w-16">
            <div key="0" className="flex-1 flex justify-center items-center text-center text-white font-jaro text-4xl">{quantity}</div>
            <div key="1" className="flex-4 flex flex-row gap-1 justify-between">
                <CircularButton key="2" index="2"
                    textColor={quantity === 1 ? "text-highlightRed" : "text-backgroundSecondary"}
                    text={quantity === 1 ? "×" : "-"}
                    onClick={() => decrementQuantity(product)} />
                <CircularButton key="3" index="3"
                    text="+"
                    onClick={() => incrementQuantity(product)} />
            </div>
        </div>
    )
}

type CircularButtonProps = {
    index: string,
    text: string,
    textColor?: string,
    onClick: () => void
};

function CircularButton({ index, text, textColor, onClick }: CircularButtonProps) {
    return (
        <div key={index}
            className={`rounded-full select-none bg-white aspect-square w-6 cursor-pointer text-center text-bold ${textColor ?? "text-backgroundSecondary"}`}
            onClick={onClick}>
            {text}
        </div>
    )
}
