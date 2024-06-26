import ExportButton from "@/Components/Buttons/ExportExcelButton";
import { SelectEventList } from "@/Components/Event/PopOver";
import { LoadingList } from "@/Components/LoadingSearch";
import PageHeader from "@/Components/PageHeader";
import Paginate from "@/Components/Paginate";
import PrintEvaluations from "@/Components/Reports/Print/PrintEvaluations";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PrinterIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Head, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Attendance({ auth, events }) {
    const [attendance, setAttendance] = useState([]);
    const [attendancePageList, setAttendancePageList] = useState(null);
    const [pages, setPages] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(events[0].id)
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [isPrint, setIsPrint] = useState(false)
    const showMenu = useSelector(state => state.menuToggle.showMenu)

    const setAttendaceData = (initialData) => {
        let initial = { ...initialData };

        // set the current page, and if the page is empty default to 1
        let currentPage = initial.current_page;

        // store the pages object
        setAttendancePageList((prev) => ({ ...prev, [currentPage]: initial }));

        // set the current data of attendace list
        setAttendance(initial.data);

        let pageWithoutData = { ...initialData };

        // delete the data to avoid redunduncy
        delete pageWithoutData["data"];

        // sets the current page object
        setPages(pageWithoutData);
    };

    const sendFilterRequest = (pageNumber = null) => {
        return axios.get(route("attendance", { 
            _query: { page: pageNumber, search: search, event: selectedEvent } 
        }))
    }

    const getNextAndPrevPages = async (pageNumber, persist = false) => {
        if (!attendancePageList.hasOwnProperty(pageNumber) || persist) {
            setLoadingSearch(true);
            const response = await sendFilterRequest(pageNumber)

            setAttendaceData(response.data);
            setLoadingSearch(false);
        } else {
            setAttendaceData(attendancePageList[pageNumber]);
        }
    };

    useEffect(() => {
        setLoadingSearch(true);
        if(!selectedEvent) {
            axios.get(route("attendance")).then((res) => {
                setAttendaceData(res.data);
                setLoadingSearch(false);
            });
        } else {
            async function getAttendance() {
                let response = await sendFilterRequest()
                let data = response.data
                setAttendaceData(data)
                setLoadingSearch(false);
            }
    
            getAttendance()
        }
    }, [selectedEvent]);

    useEffect(() => {
        if(search) {
            setLoadingSearch(true);
            async function getAttendance() {
                let response = await sendFilterRequest()
                let data = response.data
                setAttendaceData(data)
                setLoadingSearch(false);
            }
    
            getAttendance()
        } else {
            async function getAttendance() {
                let response = await sendFilterRequest()
                let data = response.data
                setAttendaceData(data)
                setLoadingSearch(false);
            }
    
            getAttendance()
        }
    }, [search]);

    useEffect(() => {
        
    }, [selectedEvent])

    return (
        <Authenticated user={auth.user}>
            <Head title="Attendance" />
            <PageHeader title="Attendance" links={["Attendance"]} />

            <div className="flex md:flex-row flex-col md:items-center mb-2">
                <div className="font-semibold text-lg text-blue-800">
                    Summary
                </div>

                <div className="flex ml-auto mt-4 md:mt-0">
                    <ExportButton exportRoute={route('export.attendance', {id: selectedEvent??events[0].id})} />

                    <button onClick={() => setIsPrint(true)} className="flex items-center gap-2 rounded-md ml-3 px-3 py-1.5 pr-4 bg-blue-600 text-white hover:bg-blue-600/90 transition duration-150 hover:shadow-md">
                        <PrinterIcon className="w-5 h-5" />
                        <div className="sm:block hidden">Print</div>
                    </button>
                </div>
            </div>

            <SelectEventList eventList={events} onSelectEvent={setSelectedEvent} />

            <div className="container p-3 text-gray-700 mt-3">
                <div className="flex sm:w-fit border h-9 rounded-md overflow-hidden ml-auto">
                    <div className="sm:w-56 w-full">
                        <SearchInput onSearch={(value) => setSearch(value)} onInput={(input) => input && setLoadingSearch(true)} />
                    </div>
                </div>

                <div className="overflow-x-auto flex flex-col">
                    <div className="divide-y w-fit min-lg:grow min-lg:w-full">
                        <div className={`grid grid-cols-[11rem,6rem,minmax(15rem,1fr),10rem,minmax(15rem,1fr),6rem,6rem] text-sm font-bold font-open pb-2 mt-3`}>
                            <div className="capitalize px-2">Name</div>
                            <div className="capitalize px-2">Sex</div>
                            <div className="capitalize px-2">Position/Designation</div>
                            <div className="px-2">Area of Assignment</div>
                            <div className="capitalize px-2">Email</div>
                            <div className="capitalize px-2">Time in</div>
                            <div className="capitalize px-2">Time out</div>
                        </div>

                        <div className="h-[calc(100vh-16rem)] py-2">
                            {
                                search && !loadingSearch && attendance.length === 0 ? (
                                    <div className="text-center">
                                        No records found for "{" "}
                                        <span className="font-medium">{search}</span> "
                                    </div>
                                ) : !search && !loadingSearch && attendance.length == 0 ? (
                                    <div className="p-3 w-full text-center">No records</div>
                                ) : loadingSearch ? (
                                    <LoadingList
                                        column={7}
                                        grid="grid-cols-[11rem,6rem,1fr,10rem,1fr,6rem,6rem]"
                                    />
                                ) : (
                                    <AttendanceList attendance={attendance} />
                                )
                            }
                        </div>
                    </div>
                </div>
                {pages?.last_page > 1 && (
                    <Paginate
                        disabled={{
                            next: pages?.next_page_url ? true : false,
                            previous: pages?.prev_page_url ? true : false,
                        }}
                        contentList={pages}
                        onPrevious={() =>
                            getNextAndPrevPages(pages.current_page - 1)
                        }
                        onNext={() => getNextAndPrevPages(pages.current_page + 1)}
                    />
                )}
            </div>
            
            <PrintEvaluations show={isPrint} onCancel={() => setIsPrint(false)} src={route('print.attendance', {_query: { id: selectedEvent}})} />
        </Authenticated>
    );
}

const AttendanceList = ({ attendance }) => {

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

    return (<>
        {
            attendance.map((attendance, index) => (
                <div
                    key={index}
                    className={
                        "grid grid-cols-[11rem,6rem,minmax(15rem,1fr),10rem,minmax(15rem,1fr),6rem,6rem] h-12 items-center rounded-md list-hover transition duration-150 cursor-default"
                    }
                >
                    <div className="capitalize px-2.5 items-center">
                        {attendance.participants.name}
                    </div>
                    <div className="px-2.5 min-lg:flex block items-center ">
                        {attendance.participants.gender}
                    </div>
                    <div className="px-2.5 items-center">
                        <div className="overflow-hidden text-ellipsis">
                            {attendance.participants.position}
                        </div>
                    </div>
                    <div className="px-2.5 items-center">
                        <div className="line-clamp-1">
                            {attendance.participants.province}
                        </div>
                    </div>
                    <div className="px-2.5 items-center">
                        <div className="overflow-hidden text-ellipsis"> {attendance.participants.email} </div>
                    </div>
                    <div className="px-2.5 capitalize">
                        {moment(attendance.time_in).format('LT')}
                    </div>
                    <div className="px-2.5 capitalize">
                        {attendance.time_out && moment(attendance.time_out).format('LT')}
                    </div>
                </div>
            ))
        }
    </>
    );
};

const Remarks = styled.div.attrs(({ $early, $late, $onTime }) => ({
    className: `${$early&&'bg-green-200 text-green-600'} ${$late&&'bg-orange-200 text-orange-600'} ${$onTime&&'bg-blue-200 text-blue-600'} text-xs uppercase font-bold p-1.5 px-2 rounded`
}))``