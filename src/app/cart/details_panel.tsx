import Select from "react-select";
import { ShoppingStage } from "../types/shopping_stages";
import { useState } from "react"

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
];


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

export default function DetailsPanel({ stage }: DetailsPanelProp) {

    const [street, streetState] = useState("");
    const [number, numberState] = useState("");
    const [flat, flatState] = useState("");
    const [post, postcodeState] = useState("");
    const [city, cityState] = useState("");
    const [country, countryState] = useState("");
    const [prefix, prefixState] = useState("");
    const [phone, phoneState] = useState("");
    const [email, emailState] = useState("");

    const stateTable = [street,number,flat,post,city,country,prefix,phone,email];

    const handle = (name: string, value: string | undefined) => {
        if(value != undefined){
            switch(name){
                case names[0]:
                    streetState(value)
                case names[1]:
                    numberState(value)
                case names[2]:
                    flatState(value)
                case names[3]:
                    postcodeState(value)
                case names[4]:
                    cityState(value)
                case names[5]:
                    countryState(value)
                case names[6]:
                    prefixState(value)
                case names[7]:
                    phoneState(value)
                case names[8]:
                    emailState(value)
            }
        }
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
                                    {row.map((props, i) => <InputPaneReadOnly key={i} index={i} stateTable={stateTable} handle={handle} {...props} />)}
                                </div>
                            ))
                        }
                    </div>

                    <h1 className="flex text-start text-3xl font-inter">Contact</h1>
                    <div className="flex flex-col">
                        {
                            CONTACT_INPUT_ROWS.map((row, j) => (
                                <div key={j} className="flex flex-row gap-2">
                                    {row.map((props, i) => <InputPaneReadOnly key={i} index={i} stateTable={stateTable} handle={handle} {...props} />)}
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
