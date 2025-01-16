import { ShoppingStage, ShoppingStages } from "../types/shopping_stages";

type StageProps = {
    name: string,
    index: number,
    is_selected: boolean,
}

function Dots({ gradient, index }: { gradient: boolean, index: number }) {

    const COLORS = gradient
        ? ["bg-[#A2A2A2]", "bg-[#B9B9B9]", "bg-[#D9D9D9]"] as const
        : ["bg-[#D9D9D9]", "bg-[#D9D9D9]", "bg-[#D9D9D9]"] as const;

    return (
        <div key={index} className="flex flex-row gap-3 justify-between">
            {COLORS.map((color, i) => (
                <div key={i} className={`rounded-full aspect-square w-5 h-auto ${color}`}></div>
            ))}
        </div>
    );
}

function Stage({ name, index, is_selected }: StageProps) {
    const background = is_selected ? "bg-backgroundSecondary" : "bg-background";
    const text_color = is_selected ? "text-white" : "text-backgroundSecondary";
    return (
        <div key={index} className={`flex w-52 h-24 rounded-2xl ${background} text-3xl
            font-bold justify-center text-center items-center ${text_color}`}>
            {name}
        </div>
    );
}

export type StagesProps = {
    currentStage: ShoppingStage,
}

export default function Stages({ currentStage: current_stage }: StagesProps) {
    const values = ShoppingStages.values;

    return (
        <div key="0" className="flex-1 flex flex-row grow justify-around items-center text-center rounded-2xl bg-white px-5 py-3">
            {
                values
                    .map((value, i) => (
                        <>
                            <Stage name={value.toString()} is_selected={value === current_stage} index={i} key={i} />
                            {
                                (i != values.length - 1)
                                    ? (<Dots index={i} gradient={value === current_stage} />)
                                    : (<></>)
                            }
                        </>
                    ))
            }
        </div>
    );
}