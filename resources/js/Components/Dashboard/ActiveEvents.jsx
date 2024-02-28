import { convertDate } from "@/js/DateFormatter";
import ViewActiveEvent from "./ViewActiveEvent";
import { useState } from "react";

export default function ActiveEvent({ active }) {
    const [selected, setSelected] = useState(null)
    return (
        <div className="mt-3 h-full">
            <div className="text-blue-800 font-semibold text-lg mb-2">
                Active Cap Dev Training
            </div>
            <div className="grid grid-cols-[7rem,7rem,12rem,1fr] font-open font-bold border-b pb-2">
                <div className="px-2">Date</div>
                <div className="px-2">Time</div>
                <div className="px-2">Venue/Link</div>
                <div className="px-2">Cap Dev Training</div>
            </div>
            <div className="overflow-y-auto overscroll-contain h-[18rem] pt-1">
                { 
                    active.map((list, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[7rem,7rem,12rem,1fr] h-14 cursor-default rounded-md overflow-hidden list-hover mb-1"
                            onClick={() => setSelected(list)}
                        >
                            <div className="px-2 flex items-center text-sm">
                                {convertDate(list.dateStart,list.dateEnd,null,null,true)}
                            </div>
                            <div className="px-2 flex items-center text-sm !lowercase">
                                {convertDate(null,null,list.event_code[0].time_in, list.event_code[0].time_out)}
                            </div>
                            <div className="px-2 flex items-center">
                                {list.platform == "Face-to-face" ? (
                                    <div className="line-clamp-1">{list.venue}</div>
                                ) : (
                                    <a
                                        href={list.venue}
                                        target="_blank"
                                        className="hover:text-blue-500 cursor-pointer line-clamp-2 text-sm"
                                    >
                                        {list.venue}
                                    </a>
                                )}
                            </div>
                            <div className="px-2 flex items-center">
                                <div className="line-clamp-1">{list.title}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ViewActiveEvent show={selected?true:false} event={selected} onClose={() => setSelected(null)} />
        </div>
    )
}