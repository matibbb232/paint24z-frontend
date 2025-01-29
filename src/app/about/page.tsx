"use client"

import "constants";
import NavBar from "../components/nav_bar";
import LoadingDots from "../components/loading_dots";
import { useEffect, useState } from "react";
import { api_url } from "../resources/api";
import { PageState, PageStatus } from "../types/page_state";
import { AboutData } from "../types/about";

function choosePage(pageState: PageState<AboutData>) {
    switch (pageState.status) {
        case PageStatus.Data:
            return (
                <div className="text-black text-lg justify-center items-center flex flex-col gap-4 p-5">
                    <span className="font-jaro text-5xl pb-3">{pageState.data.store.name}</span>
                    <span>{`email: ${pageState.data.store.email_address}`}</span>
                    <span>{`tel.: ${pageState.data.store.phone_number}`}</span>
                    <span>{`NIP: ${pageState.data.store.tax_id}`}</span>
                    <hr />
                    <span className="font-jaro text-5xl pb-3">Our locations:</span>
                    {
                        pageState.data.addresses.length > 0
                            ? pageState.data.addresses.map((address, i) => (<span className="pb-3" key={i}>{`${address.street} \
                                    ${address.building_number} \
                                    ${address.apartment_number ? `apartm. ${address.apartment_number}` : ''}, \
                                    ${address.postal_code} \
                                    ${address.city}, \
                                    ${address.country}`}</span>)
                            )
                            : <span>{"We don't have any locations... yet!"}</span>
                    }
                </div>
            );
        case PageStatus.Error:
            return (
                <div className="grid grid-rows-2 grid-cols-1 place-items-center">
                    <h1>{"Something went wrong..."}</h1>
                    <h3>{`Reason: ${pageState.reason ?? "unknown"}`}</h3>)
                </div>
            );
        case PageStatus.Loading:
            return (
                <div className="flex grow items-center justify-center">
                    <LoadingDots />
                </div>
            );
    }
}

export default function Index() {
    const [pageState, setPageState] = useState<PageState<AboutData>>({ status: PageStatus.Loading });

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(api_url('about'));
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                // TODO: check if all fields are being received
                const aboutData: AboutData = await response.json();

                setPageState({ status: PageStatus.Data, data: aboutData });
            } catch (err) {
                // TODO: idk if displaying any error like this is good for the UX...
                setPageState({ status: PageStatus.Error, reason: `An error occured: ${err}` });
            }
        };

        fetchDataForPosts();
    }, []);

    return (
        <>
            <NavBar />
            {choosePage(pageState)}
        </>
    );
}
