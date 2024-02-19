import { FilterButton } from "@/Components/Event/PopOver";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function TopCards({ onTimeIn, onTimeOut, numberOfEvents}) {
    const [filterEventTotal, setFilterEventTotal] = useState("Total")

    /* const getEvntsFilter = filterEvent => {
        setFilterEventTotal(filterEvent)
    } */

    return (
        <div className="grid grid-cols-[2fr,1fr] gap-3">
            <div className="min-h-[6rem] bg-white rounded-md ring-1 ring-slate-200/40 p-2.5 relative">
                <div className="sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold mb-2">
                    Take Attendance
                </div>

                <div className="flex gap-2.5 w-full font-semibold">
                    <button onClick={() => onTimeIn("Time in")} className="w-full p-2 rounded bg-blue-600 200 uppercase text-white blue-800 hover:opacity-80 transition duration-150 hover:shadow-md">
                        Time in
                    </button>
                    <button onClick={() => onTimeOut("Time out")} className="w-full p-2 rounded bg-pink-600 200 uppercase text-white pink-800 hover:opacity-80 transition duration-150 hover:shadow-md">
                        Time out
                    </button>
                </div>
            </div>
            <div className="h-24 bg-white rounded-md ring-1 ring-slate-200/40 flex p-2.5 items-center relative">
                <div className="lg:w-20 sm:w-14 shrink-0">
                    <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 sm:h-10 bg-red-300/20 flex items-center justify-center text-red-700">
                        <CalendarDaysIcon className="lg:w-7 sm:w-5 lg:h-7 sm:h-5" />
                    </div>
                </div>
                <div>
                    <div className="lg:text-2xl sm:text-lg text-blue-900 font-semibold">
                        {numberOfEvents[filterEventTotal]}
                    </div>
                    <div className="sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                        Number of Events |{" "}
                        <span className="opacity-40 font-medium">{filterEventTotal}</span>
                    </div>
                </div>
                <FilterButton 
                    onClick={setFilterEventTotal}
                    list={["Total", "Upcoming"]}
                />
            </div>
        </div>
    );
}

/* const FilterButton = () => {
    return (
        <>
            <button className="absolute rounded-full hover:bg-slate-200/60 duration-150 transition h-7 w-7 flex items-center justify-center shrink-0 top-2 right-2">
                <i className="bi bi-filter text-xl leading-[1.20rem]"></i>
            </button>
        </>
    );
}; */