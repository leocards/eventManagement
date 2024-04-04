import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function EventTabs({ eventTab, onChangeTab, addRP = () => {} }) {

    const { url } = usePage()

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between mb-2 text-blue-900">
            <div className="h-9 flex gap-2">
                <button
                    onClick={() => router.get(route("event"))}
                    className={
                        "px-3 rounded-md " +
                        (url == "/event"
                            ? "bg-blue-500/20 text-blue-600"
                            : "hover:bg-blue-600/5")
                    }
                >
                    Event
                </button>
                <button
                    onClick={() => router.get(route("rp"))}
                    className={
                        "px-3 rounded-md " +
                        (url == "/event/resource_person"
                            ? "bg-blue-500/20 text-blue-600"
                            : "hover:bg-blue-600/5")
                    }
                >
                    Resource person
                </button>
            </div>

            <div className="ml-auto sm:ml-0 mt-3 sm:mt-0">
                <button
                    onClick={() => {
                        if(url == "/event")
                            router.get(route('event'), {event: "event"}, {replace: true})
                        else
                            addRP()
                    }}
                    className="h-9 rounded-md px-3 pr-4 flex items-center bg-blue-600 text-white gap-2 hover:bg-blue-600/90 transition duration-150 hover:shadow-md"
                >
                    <PlusCircleIcon className="w-5 h-5" /> New
                    {url == "/event" ? " Event" : " Resource Person"}
                </button>
            </div>
        </div>
    );
}
