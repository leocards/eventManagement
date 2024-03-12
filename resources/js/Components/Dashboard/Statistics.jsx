import { CalendarDaysIcon, InformationCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { FilterButton } from "../Event/PopOver";
import { useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Statistics({ totalEmployee, numberOfEvents, attendance, gender }) {
    const [filterEvents, setFilterEvents] = useState('Total')
    const [filterAttendace, setFilterAttendace] = useState('Today')

    return (
        <div className="grid grid-cols-[2fr,1fr] gap-3 px-0.5">
            <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                    <div className="lg:w-20 sm:w-14 w-10 mr-4 sm:mr-0 shrink-0">
                        <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 h-10 bg-blue-300/20 flex items-center justify-center text-blue-700">
                            <UserGroupIcon className="lg:w-7 w-5 lg:h-7 h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="lg:text-2xl text-lg text-blue-900 font-semibold">
                            {totalEmployee}
                        </div>
                        <div className="hidden sm:block sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                            Number of Employee
                        </div>
                    </div>
                    <SexDesigregation gender={gender} />
                </div>
                <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                    <div className="lg:w-20 sm:w-14 w-10 mr-4 sm:mr-0 shrink-0">
                        <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 h-10 bg-red-300/20 flex items-center justify-center text-red-700">
                            <CalendarDaysIcon className="lg:w-7 w-5 lg:h-7 h-5" />
                        </div>
                    </div>
                    <div>
                        <div className="lg:text-2xl text-lg text-blue-900 font-semibold">
                            {numberOfEvents[filterEvents]}
                        </div>
                        <div className=" hidden sm:block sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                            Number of Events
                        </div>
                    </div>
                    <FilterButton list={["Total", "Upcoming"]} onClick={setFilterEvents} />
                </div>
            </div>
            <div className="h-20 bg-white rounded-md ring-1 ring-slate-200/40 flex p-3 items-center relative">
                <div className="lg:w-20 sm:w-14 w-10 mr-4 sm:mr-0 shrink-0">
                    <div className="rounded-full shrink-0 lg:w-14 sm:w-10 lg:h-14 h-10 bg-orange-300/20 flex items-center justify-center text-orange-700">
                        <i className="bi bi-person-check sm:text-[28px] text-[20px]"></i>
                    </div>
                </div>
                <div>
                    <div className="lg:text-2xl text-lg text-blue-900 font-semibold">
                        {attendance[filterAttendace]}
                    </div>
                    <div className=" hidden sm:block sm:text-xs md:text-sm xl:text-base text-blue-900 font-semibold">
                        Number of Trainees Attended
                    </div>
                </div>
                <FilterButton onClick={setFilterAttendace} />
            </div>
        </div>
    );
}

export function SexDesigregation({ gender }) {
    return (
        <div className="w-fit absolute top-2 right-2">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-full p-1 text-sm font-medium hover:bg-slate-200/60 duration-150 transition focus:outline-none">
                        <InformationCircleIcon className="w-5 h-5" />
                    </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="p-1.5 px-3">
                            Male: {gender?.Male}
                        </div>
                        <div className="p-1.5 px-3">
                            Female: {gender?.Female}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}