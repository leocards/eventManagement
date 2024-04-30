import moment from "moment"
import styled from "styled-components";
import PrintHeader from "./PrintHeader";
import { convertDate } from "@/js/DateFormatter";

export default function PrintAttendance({ attendance, event }) {
    const printStyle = `
        @media print {
            @page {
                size: auto;
            }

            * {
                font-size: 11px;
            }
        }
    `;

    const checkRemarkStatus = (log, timeIn, cutOff) => {
        let timeLog = new Date(log)
        let eventTimeIn = new Date(timeIn)
        let eventCutoff = new Date(cutOff)

        if(timeLog.getTime() < eventTimeIn.getTime()) {
            return <Remarks $early>early</Remarks>
        } else if(timeLog.getTime() >= eventTimeIn.getTime() && timeLog.getTime() <= eventCutoff.getTime()) {
            return <Remarks $onTime>on time</Remarks>
        } else return <Remarks $late>Late</Remarks>
    }

    return (
        <div className="print:text-xs text-black p-2">
            <style dangerouslySetInnerHTML={{ __html: printStyle }}></style>
            <div className="max- w-6xl w-full p- mx-auto my-auto">
                
                <PrintHeader />

                <div className="">
                    <div className="my-5">
                    <h1 className="font-gotham text-3xl w-fit mx-auto mb-5">Attendance Summary Report</h1>

                        {event && <>
                            <div className="max-w-2xl mx-auto text-center font-semibold"> {event.title} </div>
                            <div className="w-fit mx-auto">
                                <span>{ convertDate(event.dateStart, event.dateEnd) }</span> | 
                                <span> { convertDate(null,null,event.time_in, event.time_out) }</span>
                            </div>
                            <div className="w-fit mx-auto">@ { event.platform == "Face-to-face" ? event.venue : "Virtual" }</div>
                        </>}
                    </div>

                    <div className="border w-fit mx-auto border-b-0 border-black/30">
                        <div className="grid w-fit print:grid-cols-[11rem,6rem,13.5rem,10rem,13.5rem,6rem,6rem] grid-cols-[11rem,6rem,13.5rem,10rem,13.5rem,6rem,6rem] border-black/30 border-b text-sm font-gotham">
                            <div className="capitalize px-2 py-2 border-black/30 border-r">Name</div>
                            <div className="capitalize px-2 py-2 border-black/30 border-r">Sex</div>
                            <div className="capitalize px-2 py-2 border-black/30 border-r">Position/Designation</div>
                            <div className="capitalize px-2 py-2 border-black/30 border-r">Area of Assignment</div>
                            <div className="capitalize px-2 py-2 border-black/30 border-r">Email</div>
                            <div className="capitalize px-2 py-2 border-black/30 border-r text-center">Time In</div>
                            <div className="capitalize px-2 py-2 border-black/30 text-center">Time Out</div>
                        </div>

                        {
                            attendance.map((attendance, index) => (
                                <div
                                    key={index}
                                    className={
                                        "grid w-fit print:grid-cols-[11rem,6rem,13.5rem,10rem,13.5rem,6rem,6rem] grid-cols-[11rem,6rem,13.5rem,10rem,13.5rem,6rem,6rem] border-black/30 border-b cursor-default text-sm"
                                    }
                                >
                                    <div className="capitalize px-2.5 py-1.5 flex items-center border-black/30 border-r text-wrap">
                                        {attendance.participants.name}
                                    </div>
                                    <div className="px-2.5 py-1.5 flex items-center border-black/30 border-r">
                                        {attendance.participants.gender}
                                    </div>
                                    <div className="px-2.5 py-1.5 flex items-center border-black/30 border-r text-wrap">
                                        {attendance.participants.position}
                                    </div>
                                    <div className="capitalize px-2.5 py-1.5 flex items-center border-black/30 border-r text-wrap">
                                        {attendance.participants.province}
                                    </div>
                                    <div className="capitalize px-2.5 py-1.5 border-black/30 border-r text-wrap">
                                        {attendance.participants.email}
                                    </div>
                                    <div className="px-2.5 py-1.5 flex items-center border-r border-black/30 justify-center">
                                        {moment(attendance.time_in).format('LT')}
                                    </div>
                                    <div className="px-2.5 py-1.5 flex items-center justify-center">
                                        {attendance.time_out && moment(attendance.time_out).format('LT')}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Remarks = styled.div.attrs(({ $early, $late, $onTime }) => ({
    className: `${$early&&'green-200 text-green-600'} ${$late&&'orange-200 text-orange-600'} ${$onTime&&'blue-200 text-blue-600'} text-xs uppercase font-bold p-1.5 px-2 rounded`
}))``