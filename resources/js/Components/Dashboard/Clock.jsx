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
        <div className="rounded-md bg-white flex p-2 px-3.5 ring-1 ring-slate-200/40 text-blue-900">
            <div className="flex items-center">
                <div className="w-12 h-12 flex justify-center items-center rounded-full bg-green-400/20 text-green-600">
                    <ClockIcon className="w-6 h-6" />
                </div>

                <div className="ml-3 flex items-center">
                    <div className="text-2xl font-semibold w-36">
                        <span>{time}</span>
                    </div>

                    <div className="border-l-2 border-slate-400 ml-3 pl-3">
                        <div className="font-semibold text-red-500">{date.day}</div>
                        <div>{date.date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}