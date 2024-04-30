import { ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";

export default function Clock()
{
    const [time, setTime] = useState(moment().format('LTS'))
    const [date, setDate] = useState({
        day: moment().format('dddd'),
        date: moment().format('LL')
    })

    useEffect(() => {

        const setMoment = () => {
            setTime(moment().format('LTS'))
            setDate({
                day: moment().format('dddd'),
                date: moment().format('LL')
            })
        }

        const startMoment = setTimeout(setMoment, 1000)

        return () => { clearTimeout(startMoment) }
    }, [time])

    return (
        <div className="rounded-md md:bg-white flex p-2 px-3.5 md:ring-1 ring-slate-200/40 text-blue-900 w-fit ml-auto md:ml-0 md:w-auto">
            <div className="flex items-center">
                <div className="md:w-12 md:flex hidden w-9 md:h-12 h-9 justify-center items-center rounded-full bg-green-400/20 text-green-600">
                    <ClockIcon className="md:w-6 md:h-6 w-5 h-5" />
                </div>

                <div className="ml-3 flex md:flex-row flex-col md:items-center">
                    <div className="md:text-2xl text-sm font-semibold md:w-40 ml-auto tabular-nums">
                        <span>{time}</span>
                    </div>

                    <div className="md:border-l-2 border-slate-400 sm:ml-3 sm:pl-3 md:block flex">
                        <div className="font-semibold text-red-500 text-sm md:mr-0 mr-3 max-xs:text-xs">{date.day}</div>
                        <div className="text-sm max-xs:text-xs">{date.date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}