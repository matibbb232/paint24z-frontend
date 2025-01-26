"use client"

import { useRouter } from "next/navigation";

type CategoryListItemProps = {
    id: string,
    name: string,
    img_url: string,
}

export default function CategoryListItem(props: CategoryListItemProps) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/?category=${props.id}`)} className="flex flex-1 flex-col gap-5 justify-center items-center rounded-3xl bg-white pt-5 pb-12 hover:cursor-pointer ease-in-out duration-300 hover:bg-neutral-200">
            <span className="text-black font-jaro text-center text-7xl">{props.name}</span>
            <img src={props.img_url} className="w-[400px] aspect-square rounded-xl"/>
        </div>
    );
}