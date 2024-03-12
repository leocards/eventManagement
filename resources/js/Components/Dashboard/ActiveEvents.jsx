import { convertDate } from "@/js/DateFormatter";
import ViewActiveEvent from "./ViewActiveEvent";
import { useState } from "react";
import { CalendarDaysIcon, LinkIcon, MapPinIcon } from "@heroicons/react/20/solid";

export default function ActiveEvent({ active }) {
    const [selected, setSelected] = useState(null);
    return (
        <div className="mt-3 h-full">
            <div className="text-blue-800 font-semibold text-lg mb-2">
                Active Cap Dev Training
            </div>
            <div className="overflow-y-auto overscroll-contain h-[18rem] pt-1">
                {active.map((list, index) => (
                    <div key={index} onClick={() => setSelected(list)} 
                    className="rounded-md overflow-hidden hover:ring-1 ring-inset ring-slate-200 hover:bg-slate-100/80 transition duration-150 mb-1 p-1.5 px-2.5 cursor-pointer">
                        <div className="font-bold">{list.title}</div>
                        <div className="flex gap-5">
                            <div className="flex gap-5">
                                <div className="text-sm opacity-80 flex items-center gap-1 shrink-0">
                                    <CalendarDaysIcon className="w-4 h-4" />
                                    {convertDate(
                                        list.dateStart,
                                        list.dateEnd,
                                        null,
                                        null,
                                        true
                                    )}
                                    {" "} | {" "}
                                    {convertDate(
                                        null,
                                        null,
                                        list.event_code[0].time_in,
                                        list.event_code[0].time_out
                                    )}
                                </div>
                                {list.platform == "Face-to-face" ? (
                                    <div className="text-sm opacity-80 flex items-center gap-1">
                                        <MapPinIcon className="w-4 h-4 shrink-0" />
                                        <div className="line-clamp-1">
                                            {list.venue}
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={list.venue}
                                        target="_blank"
                                        className="hover:text-blue-500 cursor-pointer line-clamp-1 text-sm flex items-center gap-1"
                                    >
                                        <LinkIcon className="w-4 h-4 shrink-0" />
                                        <div className="line-clamp-1">
                                            {list.venue}
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ViewActiveEvent
                show={selected ? true : false}
                event={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}
