"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api_url } from "../resources/api";

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null | undefined>(null);
    const [password, setPassword] = useState<string | null | undefined>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async () => {
        if (!username) {
            setError("`Username` field cannot be empty");
            console.log(error)
            return;
        }
        if (!password) {
            setError("`Password` field cannot be empty");
            console.log(error)
            return;
        }

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const login_response = await fetch(api_url("token"),
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({ username: username, password: password })
                }
            );

            if (!login_response.ok) {
                throw new Error(`HTTP Error: ${login_response.status} ${login_response.statusText}`);
            }

            const login_data: { refresh: string, access: string } = await login_response.json();
            localStorage.setItem('access_token', login_data.access);
            localStorage.setItem('refresh_token', login_data.refresh);
            localStorage.setItem('username', username);
            console.log('acces=', localStorage.getItem('access_token'), 'refresh=', localStorage.getItem('refresh_token'))
            // TODO: set and use refresh token!

            router.push("/");
        } catch (err) {
            setError(`${err}`);
        }

    }

    return (
        <>
            <div className="flex flex-col rounded-2xl justify-center items-center p-3 gap-3">
                <h1 className="flex justify-center text-center font-bold font-jaro text-7xl p-5 pb-7 cursor-pointer" onClick={() => router.push("/")}>Our Shop</h1>
                <div className="flex flex-row h-[300px] flex-1 justify-around bg-white text-black text-center 
                    rounded-2xl cursor-pointer hover:bg-neutral-100 duration-300">
                </div>
                <hr className="flex-1 bg-black w-full h-1 mx-auto"></hr>
                <div className="bg-zinc-100 rounded-3xl px-5 flex flex-col w-[750px] justify-center gap-5 p-10 item-center">
                    <InputPane
                        onInput={(e) => setUsername(e.target.value)}
                        name="Username" width="w-full"
                        placeholder="Username"
                        flex={"flex-1"} index={4} />
                    <InputPane
                        onInput={(e) => setPassword(e.target.value)}
                        name="Password" width="w-full"
                        placeholder="Password"
                        flex={"flex-1"} index={4} />
                    {
                        error ? <span className="text-highlightRed text-lg">{error}</span> : <></>
                    }
                    <button onClick={() => onSubmit()}
                        className={`bg-highlightYellow cursor-pointer py-2 text-white text-2xl rounded-3xl`}>
                        Login
                    </button>
                </div>
            </div>
        </>
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
            <span className="text-start text-lg text-backgroundSecondary w-full">{props.name}</span>
            <InputPaneOfType {...props} />
        </div>
    );
}

function InputPaneOfType(props: InputPaneProps) {
    return (
        <input onChange={props.onInput} onInput={() => console.log('hehe')} className="bg-white rounded-xl p-2" placeholder={props.placeholder}></input>
    );
}

export default LoginPage;