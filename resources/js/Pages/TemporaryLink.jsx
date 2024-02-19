import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function TemporaryLink({ code, session, title, expire }) {
    const [isCopied, setIsCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1000);
    };

    return (
        <div className="top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2 fixed max-w-md">
            <div className=" text-center mt-4 mb-7">
                <div>{session} code for</div>
                <div>{title}</div>
            </div>
            <div onClick={copyCode} className="shadow bg-white rounded group cursor-pointer">
                <Head title="Code" />
                <div className="p-4">
                    <div
                        className="group-hover:text-blue-700 break-words relative w-full flex"
                    >
                        <span className="pointer-events-none mx-auto text-center">{code}</span>
                        {isCopied && <div
                            className="select-none pointer-events-none absolute !text-white 
                                -top-10 left-1/2 -translate-x-1/2 font-normal font-sans p-1 py-0 bg-blue-500 rounded"
                        >
                            copied
                        </div>}
                    </div>
                    <div className=" text-center text-sm mt-4">Click to copy code</div>
                </div>
            </div>

            <div className="mt-7 text-sm italic text-center">
                This link will expire on {expire}
            </div>
        </div>
    );
}
