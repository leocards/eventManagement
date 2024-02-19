import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { FilterButton } from "../Event/PopOver";
import { useState } from "react";

export default function Statistics({ totalEmployee, numberOfEvents, attendance }) {
    const [filterEvents, setFilterEvents] = useState('Total')
    const [filterAttendace, setFilterAttendace] = useState('Today')

    return (
        <div className="grid grid-cols-[2fr,1fr] gap-3">
            <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                    <div className="lg:w-20 sm:w-14 shrink-0">
                        <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 sm:h-10 bg-blue-300/20 flex items-center justify-center text-blue-700">
                            <UserGroupIcon className="lg:w-7 sm:w-5 lg:h-7 sm:h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="lg:text-2xl sm:text-lg text-blue-900 font-semibold">
                            {totalEmployee}
                        </div>
                        <div className="sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                            Number of Employee
                        </div>
                    </div>
                </div>
                <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                    <div className="lg:w-20 sm:w-14 shrink-0">
                        <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 sm:h-10 bg-red-300/20 flex items-center justify-center text-red-700">
                            <CalendarDaysIcon className="lg:w-7 sm:w-5 lg:h-7 sm:h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="lg:text-2xl sm:text-lg text-blue-900 font-semibold">
                            {numberOfEvents[filterEvents]}
                        </div>
                        <div className="sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                            Number of Events
                        </div>
                    </div>
                    <FilterButton list={["Total", "Upcoming"]} onClick={setFilterEvents} />
                </div>
            </div>
            <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                <div className="lg:w-20 sm:w-14 shrink-0">
                    <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 sm:h-10 bg-orange-300/20 flex items-center justify-center text-orange-700">
                        <i className="bi bi-person-check text-[28px]"></i>
                    </div>
                </div>
                <div>
                    <div className="lg:text-2xl sm:text-lg text-blue-900 font-semibold">
                        {attendance[filterAttendace]}
                    </div>
                    <div className="sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                        Number of Trainees Attended
                    </div>
                </div>
                <FilterButton onClick={setFilterAttendace} />
            </div>
        </div>
    );
}