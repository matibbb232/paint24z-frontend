import Select from "react-select";
import { ShoppingStage } from "../types/shopping_stages";
import { useState } from "react"
import { Product } from "../types/product";

const enum InputType {
    TextField,
    Dropdown,
};

const COUNTRIES = [
    {value: "Poland", label: "Poland"}, 
    {value: "Germany", label: "Germany"}
] as const;

const PHONE_PREFIXES = [
    {value: "+48", label: "+48"},
    {value: "+49", label: "+49"},
] as const;

type InputPaneProps = {
    name: string,
    placeholder?: string,
    flex: string,
    width?: string,
} & ({
    inputType: InputType.TextField,
} | {
    inputType: InputType.Dropdown,
    options: readonly {value: string, label: string}[]
});

const names: string[] = [
    "Street",
    "Num.",
    "Flat",
    "Post code",
    "City",
    "Country",
    "Prefix",
    "Phone",
    "E-mail"
] as const;


const ADDRESS_INPUT_ROWS: InputPaneProps[][] = [
    [
        { flex: "flex-1", width: "w-24", name: names[0], inputType: InputType.TextField },
        { flex: "flex-2", width: "w-12", name: names[1], inputType: InputType.TextField },
        { flex: "flex-2", width: "w-12", name: names[2], inputType: InputType.TextField}
    ],
    [
        { flex: "flex-2", width: "w-24", name: names[3], inputType: InputType.TextField },
        { flex: "flex-1", width: "w-12", name: names[4], inputType: InputType.TextField }
    ],
    [
        { flex: "flex-1", width: "w-12", name: names[5], inputType: InputType.Dropdown, options: COUNTRIES },
    ]
];

const CONTACT_INPUT_ROWS: InputPaneProps[][] = [
    [
        { flex: "flex-5", width: "w-24", name: names[6], inputType: InputType.Dropdown, options: PHONE_PREFIXES },
        { flex: "flex-1", width: "w-24", name: names[7], inputType: InputType.TextField },
    ],
    [
        { flex: "flex-1", width: "w-24", name: names[8], inputType: InputType.TextField },
    ],
];


type DetailsPanelProp = {
    stage: ShoppingStage
}

export let checkDetails = () => false;

export function quantitiesFromProducts(products: Product[]): Map<Product, number> {
    type ProductAndQuantity = {
        product: Product,
        quantity: number
    };

    const map = new Map<string, ProductAndQuantity>();

    for (const product of products) {
        const maybeProduct: ProductAndQuantity | undefined = map.get(product.id);

        if (maybeProduct != undefined) {
            map.set(product.id, { product: maybeProduct.product, quantity: maybeProduct.quantity + 1 });
        } else {
            map.set(product.id, { product: product, quantity: 1 });
        }
    }

    return new Map(map.entries().map(([, { product, quantity }]) => [product, quantity]));
}

export function DetailsPanel({ stage }: DetailsPanelProp) {
    const [street, streetState] = useState("");
    const [number, numberState] = useState("");
    const [flat, flatState] = useState("");
    const [post, postcodeState] = useState("");
    const [city, cityState] = useState("");
    const [country, countryState] = useState("");
    const [prefix, prefixState] = useState("");
    const [phone, phoneState] = useState("");
    const [email, emailState] = useState("");

    function checkDetailsInner(): boolean {
        for (const [name, info] of new Map([
            ['street', street],
            ['number', number],
            // ['flat', flat],
            ['post', post],
            ['city', city],
            ['country', country],
            ['prefix', prefix],
            ['phone', phone],
            ['email', email]
        ])) {
            if (!info || info === '') {
                alert(`Field '${name}' cannot be empty!`);
                return false;
            }
        }

        if (!post.match(/[0-9][0-9]-[0-9][0-9][0-9]/g)) {
            console.log('post=', post)
            alert(`'post' field has to be formatted like: XX-XXX`);
            return false;
        }
    
        return confirm('Proceed?');
    }

    checkDetails = checkDetailsInner;

    const stateTable = [street,number,flat,post,city,country,prefix,phone,email];

    const handle = (name: string, value: string | undefined) => {
        console.log('name=', name, 'value=', value);
        if(value != undefined) {
            switch(name){
                case names[0]:
                    streetState(value)
                    console.log('streetState called')
                    break;
                case names[1]:
                    numberState(value)
                    break;
                case names[2]:
                    flatState(value)
                    break;
                case names[3]:
                    postcodeState(value)
                    break;
                case names[4]:
                    cityState(value)
                    break;
                case names[5]:
                    countryState(value)
                    break;
                case names[6]:
                    prefixState(value)
                    break;
                case names[7]:
                    phoneState(value)
                    break;
                case names[8]:
                    emailState(value)
                    break;
                default:
                    console.log('handle default called (wtf?)');
                    break;
            }
        }
        console.log(street, number, flat, post, city, country, prefix, phone, email);
    }

    switch(stage){
        case ShoppingStage.Cart: 
            return (
                <div className="flex-1 flex flex-col gap-5 p-5 rounded-3xl bg-background grow">
                    <h1 className="flex text-start text-3xl font-inter">Address</h1>
                    <div className="flex flex-col">
                        {
                            ADDRESS_INPUT_ROWS.map((row, j) => (
                                <div key={j} className="flex flex-row gap-2">
                                    {row.map((props, i) => <InputPane key={i} index={i} handle={handle} {...props} />)}
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="flex text-start text-3xl font-inter">Contact</h1>
                    <div className="flex flex-col">
                        {
                            CONTACT_INPUT_ROWS.map((row, j) => (
                                <div key={j} className="flex flex-row gap-2">
                                    {row.map((props, i) => <InputPane key={i} index={i} handle={handle} {...props} />)}
                                </div>
                            ))
                        }
                    </div>
                </div>
            );

        case ShoppingStage.Shipping:
            return(
                <div className="flex-1 flex flex-col gap-5 p-5 rounded-3xl bg-background grow">

                </div>
            );

        case ShoppingStage.Checkout:
            return(
                <div className="flex-1 flex flex-col gap-5 p-5 rounded-3xl bg-background grow">
                    <div className="flex-1 flex flex-col gap-5 p-5 rounded-3xl bg-background grow">
                    <h1 className="flex text-start text-3xl font-inter">Address</h1>
                    <div className="flex flex-col">
                        {
                            ADDRESS_INPUT_ROWS.map((row, j) => (
                                <div key={j} className="flex flex-row gap-2">
                                    {row.map((props, i) => <InputPaneReadOnly key={i} index={j} stateTable={stateTable} handle={handle} {...props} />)}
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="flex text-start text-3xl font-inter">Contact</h1>
                    <div className="flex flex-col">
                        {
                            CONTACT_INPUT_ROWS.map((row, j) => (
                                <div key={j} className="flex flex-row gap-2">
                                    {row.map((props, i) => <InputPaneReadOnly key={i} index={j + 6} stateTable={stateTable} handle={handle} {...props} />)}
                                </div>
                            ))
                        }
                    </div>
                </div>
                </div>
            );
    }
}

function InputPaneReadOnly(props: InputPaneProps & { index: number } & {stateTable: string[]} & {handle: (name: string, value: string | undefined) => void}) {
    return (
        <div key={props.index} className={`${props.flex} ${props.width} flex flex-col`}>
            <span className="text-start text-lg text-backgroundSecondary">{props.name}</span>
            <div className="bg-white rounded-xl">
                {props.stateTable[props.index] !== "" ? <p className="font-jaro font-normal text-normal">{props.stateTable[props.index]}</p> : <p className="font-jaro font-normal text-normal">-</p>}
            </div>
        </div>
    );
}

function InputPane(props: InputPaneProps & { index: number } & {handle: (name: string, value: string | undefined) => void}) {
    return (
        <div key={props.index} className={`${props.flex} ${props.width} flex flex-col`}>
            <span className="text-start text-lg text-backgroundSecondary">{props.name}</span>
            {<InputPaneOfType {...props} />}
        </div>
    );
}

function InputPaneOfType(props: InputPaneProps & { handle: (name: string, value: string | undefined) => void }) {
    switch (props.inputType) {
        case InputType.TextField:
            return (
                <input className="bg-white rounded-xl p-2" placeholder={props.placeholder} onChange={(e) => props.handle(props.name, e.target.value)}></input>
            );
        case InputType.Dropdown:
            return (
                <Select
                    className="flex grow justify-center w-full min-w-full items-center h-10 bg-white rounded-xl p-2 shadow-none border-none"
                    options={props.options}
                    name={props.name}
                    placeholder={props.placeholder}
                    onChange={(e) => props.handle(props.name, e?.label)}
                    />
            );
    }
}
