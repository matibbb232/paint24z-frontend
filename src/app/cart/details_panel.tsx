import Select from "react-select";

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

const ADDRESS_INPUT_ROWS: InputPaneProps[][] = [
    [
        { flex: "flex-1", width: "w-24", name: "Street", inputType: InputType.TextField },
        { flex: "flex-2", width: "w-12", name: "Num.", inputType: InputType.TextField },
        { flex: "flex-2", width: "w-12", name: "Flat", inputType: InputType.TextField }
    ],
    [
        { flex: "flex-2", width: "w-24", name: "Post code", inputType: InputType.TextField },
        { flex: "flex-1", width: "w-12", name: "City", inputType: InputType.TextField }
    ],
    [
        { flex: "flex-1", width: "w-12", name: "Country", inputType: InputType.Dropdown, options: COUNTRIES },
    ]
];

const CONTACT_INPUT_ROWS: InputPaneProps[][] = [
    [
        { flex: "flex-5", width: "w-24", name: "Prefix", inputType: InputType.Dropdown, options: PHONE_PREFIXES },
        { flex: "flex-1", width: "w-24", name: "Phone", inputType: InputType.TextField },
    ],
    [
        { flex: "flex-1", width: "w-24", name: "E-mail", inputType: InputType.TextField },
    ],
];

export default function DetailsPanel() {
    return (
        <div className="flex-1 flex flex-col gap-5 p-5 rounded-3xl bg-background grow">
            <h1 className="flex text-start text-3xl font-inter">Address</h1>
            <div className="flex flex-col">
                {
                    ADDRESS_INPUT_ROWS.map((row, j) => (
                        <div key={j} className="flex flex-row gap-2">
                            {row.map((props, i) => <InputPane key={i} index={i} {...props} />)}
                        </div>
                    ))
                }
            </div>

            <h1 className="flex text-start text-3xl font-inter">Contact</h1>
            <div className="flex flex-col">
                {
                    CONTACT_INPUT_ROWS.map((row, j) => (
                        <div key={j} className="flex flex-row gap-2">
                            {row.map((props, i) => <InputPane key={i} index={i} {...props} />)}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

function InputPane(props: InputPaneProps & { index: number }) {
    return (
        <div key={props.index} className={`${props.flex} ${props.width} flex flex-col`}>
            <span className="text-start text-lg text-backgroundSecondary">{props.name}</span>
            <InputPaneOfType {...props} />
        </div>
    );
}

function InputPaneOfType(props: InputPaneProps) {
    switch (props.inputType) {
        case InputType.TextField:
            return (
                <input className="bg-white rounded-xl p-2" placeholder={props.placeholder}></input>
            );
        case InputType.Dropdown:
            return (
                <Select
                    className="flex grow justify-center w-full min-w-full items-center h-10 bg-white rounded-xl p-2 shadow-none border-none"
                    options={props.options}
                    name={props.name}
                    placeholder={props.placeholder}
                    />
            );
    }
}
